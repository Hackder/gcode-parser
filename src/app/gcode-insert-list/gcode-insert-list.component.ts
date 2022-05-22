import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GCodeInsertDialogComponent } from '../gcode-insert-dialog/gcode-insert-dialog.component';
import {
  AddGCodeToModification,
  RemoveGCodeFromModification,
} from '../state/modifications.actions';
import { Insert, ModificationModel } from '../state/modifications.state';

@Component({
  selector: 'app-gcode-insert-list',
  templateUrl: './gcode-insert-list.component.html',
  styleUrls: ['./gcode-insert-list.component.scss'],
})
export class GCodeInsertListComponent implements OnDestroy {
  @Input()
  modification: ModificationModel | undefined;

  constructor(
    private dialog: DialogService,
    private store: Store,
    private confirmationService: ConfirmationService
  ) {}

  ref?: DynamicDialogRef;

  addGCodeInsert() {
    this.ref = this.dialog.open(GCodeInsertDialogComponent, {
      header: 'Add GCode Insert',
      width: '50%',
      contentStyle: { 'max-height': '500px', overflow: 'visible' },
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.store.dispatch(
          new AddGCodeToModification(this.modification!, result)
        );
      }
    });
  }

  deleteGCodeInsert(insert: Insert) {
    this.confirmationService.confirm({
      key: 'confirmDelete',
      message: `Are you sure you want to delete the modification "${insert.gcode}"?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(
          new RemoveGCodeFromModification(this.modification!, insert)
        );
      },
    });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
