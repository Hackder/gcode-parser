import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
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
import { dialog } from '@tauri-apps/api';
import { FilesModel, FilesState } from '../state/files.state';
import { getFormattedName } from '../utils/modifications';

@Component({
  selector: 'app-modifications',
  templateUrl: './modifications.component.html',
  styleUrls: ['./modifications.component.scss'],
})
export class ModificationsComponent implements OnDestroy {
  destroy$ = new Subject();

  modifications: Observable<ModificationModel[]>;

  currentFilepath: Observable<string>;

  @Output()
  saveModified = new EventEmitter<string>();

  constructor(
    private store: Store,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    this.modifications = store.select(ModificationsState);
    this.currentFilepath = store
      .select<FilesModel>(FilesState)
      .pipe(map((f) => f.currentFilepath));
  }

  ref?: DynamicDialogRef;

  activeIndex: number[] = [];

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
      message: `Are you sure you want to delete the modification "${getFormattedName(
        modification.location
      )}"?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new DeleteModification(modification));
      },
    });
  }

  async saveModifiedFile() {
    const savePath =
      this.store.selectSnapshot<FilesModel>(FilesState).currentFilepath;
    const newSavePath = savePath.replace(/\.gcode$/, '-modified.gcode');

    const path = await dialog.save({
      title: 'Save Modified File',
      defaultPath: newSavePath,
      filters: [
        {
          name: 'G-Code',
          extensions: ['gcode'],
        },
      ],
    });

    if (!path) return;

    this.saveModified.emit(path);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }

    this.destroy$.next({});
    this.destroy$.complete();
  }
}
