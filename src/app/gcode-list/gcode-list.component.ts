import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { CreateGCodeComponent } from '../create-gcode/create-gcode.component';
import { AddGCodeTemplate, EditGCodeTemplate } from '../state/gcodes.actions';
import { GCodeState, GCodeTemplate } from '../state/gcodes.state';

@Component({
  selector: 'app-gcode-list',
  templateUrl: './gcode-list.component.html',
  styleUrls: ['./gcode-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GCodeListComponent implements OnDestroy {
  destroy$ = new Subject();

  gcodes$: Observable<GCodeTemplate[]>;

  ref?: DynamicDialogRef;

  constructor(private dialogService: DialogService, private store: Store) {
    this.gcodes$ = this.store
      .select<GCodeTemplate[]>(GCodeState)
      .pipe(map((x) => [...x].sort((a, b) => a.gcode.localeCompare(b.gcode))));
  }

  trackByFn(_: number, item: GCodeTemplate) {
    if (!item) return null;
    return item.id;
  }

  addGCode() {
    this.ref = this.dialogService.open(CreateGCodeComponent, {
      header: 'Create GCode',
      width: '50%',
      contentStyle: { 'max-height': '80vh', overflow: 'hidden' },
    });

    this.ref.onClose
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe((value: GCodeTemplate) => {
        this.store.dispatch(
          new AddGCodeTemplate(value.gcode, value.description)
        );
      });
  }

  editGCode(gcode: GCodeTemplate) {
    this.ref = this.dialogService.open(CreateGCodeComponent, {
      header: 'Edit GCode',
      width: '50%',
      contentStyle: { 'max-height': '80vh', overflow: 'hidden' },
      data: gcode,
    });

    this.ref.onClose
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe((value: GCodeTemplate) => {
        this.store.dispatch(new EditGCodeTemplate(gcode.id, value));
      });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }

    this.destroy$.next({});
    this.destroy$.complete();
  }
}
