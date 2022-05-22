import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ModificationDialogComponent } from '../modification-dialog/modification-dialog.component';
import {
  AddModification,
  DeleteModification,
} from '../state/modifications.actions';
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

  constructor(
    private store: Store,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    this.modifications = store.select(ModificationsState);
  }

  ref?: DynamicDialogRef;

  activeIndex = 0;

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

  deleteModification(e: MouseEvent, modification: ModificationModel) {
    e.stopPropagation();

    this.confirmationService.confirm({
      key: 'confirmDelete',
      message: `Are you sure you want to delete the modification "${modification.location.getFormattedName()}"?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new DeleteModification(modification));
      },
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
