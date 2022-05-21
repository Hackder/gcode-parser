import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ModificationDialogComponent } from '../modification-dialog/modification-dialog.component';
import { AddModification } from '../state/modifications.actions';
import {
  ModificationLocation,
  ModificationModel,
  ModificationsState,
} from '../state/modifications.state';

@Component({
  selector: 'app-modifications',
  templateUrl: './modifications.component.html',
  styleUrls: ['./modifications.component.scss'],
})
export class ModificationsComponent implements OnDestroy {
  destroy$ = new Subject();

  modifications: Observable<ModificationModel[]>;

  constructor(private store: Store, private dialogService: DialogService) {
    this.modifications = store.select(ModificationsState);
  }

  ref?: DynamicDialogRef;

  addModification() {
    this.ref = this.dialogService.open(ModificationDialogComponent, {
      header: 'Create Modification',
      width: '50%',
      contentStyle: { 'max-height': '80vh', overflow: 'visible' },
    });

    this.ref.onClose
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe((value: ModificationLocation) => {
        this.store.dispatch(new AddModification(value));
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
