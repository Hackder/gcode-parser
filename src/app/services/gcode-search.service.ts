import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import Fuse from 'fuse.js';
import { Subject, takeUntil } from 'rxjs';
import { GCodeState, GCodeTemplate } from '../state/gcodes.state';

@Injectable({
  providedIn: 'root',
})
export class GCodeSearchService implements OnDestroy {
  destroy$ = new Subject();

  private engine: Fuse<GCodeTemplate>;

  constructor(private store: Store) {
    const currentGCodeTemplates =
      this.store.selectSnapshot<GCodeTemplate[]>(GCodeState);

    this.engine = new Fuse<GCodeTemplate>(currentGCodeTemplates, {
      keys: ['gcode', 'description'],
    });

    this.store
      .select<GCodeTemplate[]>(GCodeState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.engine.setCollection(val);
      });
  }

  search(query: string): GCodeTemplate[] {
    if (query === '') {
      return this.store.selectSnapshot<GCodeTemplate[]>(GCodeState);
    }

    return this.engine.search(query).map((x) => x.item);
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
