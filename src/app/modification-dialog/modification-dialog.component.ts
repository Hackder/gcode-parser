import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, Observable, Subject, tap } from 'rxjs';
import { AllModificationLocations } from '../state/modifications.state';

@Component({
  selector: 'app-modification-dialog',
  templateUrl: './modification-dialog.component.html',
  styleUrls: ['./modification-dialog.component.scss'],
})
export class ModificationDialogComponent implements OnDestroy {
  destroy$ = new Subject();

  modificationForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    properties: new FormGroup({}),
  });

  get type() {
    return this.modificationForm.get('type');
  }

  availableModifications = AllModificationLocations.map((x) => new x());

  properties: Observable<{ key: string; name: string }[]>;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private store: Store
  ) {
    this.properties = this.type!.valueChanges.pipe(
      map(
        (value) =>
          this.availableModifications.find((x) => x.type === value)!
            .modifiableProperties
      ),
      tap((props) => {
        this.modificationForm.removeControl('properties');
        this.modificationForm.addControl(
          'properties',
          this.craftPropertiesFormGroup(props)
        );
      })
    );
  }

  getForProp(prop: string) {
    return this.modificationForm.get('properties')?.get(prop);
  }

  craftPropertiesFormGroup(
    modifiableProperties: { key: string; name: string }[]
  ): FormGroup {
    const fg = new FormGroup({});
    for (const prop of modifiableProperties) {
      fg.addControl(prop.key, new FormControl('', [Validators.required]));
    }

    return fg;
  }

  addModification() {
    if (this.modificationForm.invalid) return;

    this.ref.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
