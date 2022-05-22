import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  combineLatest,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AddModification } from '../state/modifications.actions';
import {
  AllModificationLocations,
  ModifiableProperty,
  ModificationLocation,
  ModificationModel,
  ModificationsState,
} from '../state/modifications.state';

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

  availableModifications: ModificationLocation[] = AllModificationLocations.map(
    (x) => new x()
  );

  properties: Observable<ModifiableProperty[]>;

  isUnique: Observable<boolean>;

  invalid: Observable<boolean>;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private store: Store
  ) {
    this.properties = this.type!.valueChanges.pipe(
      takeUntil(this.destroy$),
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

    this.isUnique = this.modificationForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      switchMap((val) =>
        val.properties ? of(this.getModificationLocation(val)) : of(true)
      ),
      map(
        (loc) =>
          !this.store
            .selectSnapshot<ModificationModel[]>(ModificationsState)
            .map((m) => m.location)
            .find((x) => JSON.stringify(x) === JSON.stringify(loc))
      )
    );

    this.invalid = combineLatest([
      this.modificationForm.valueChanges,
      this.isUnique,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([_, isUnique]) => this.modificationForm.invalid || !isUnique)
    );
  }

  getModificationLocation(value: any): ModificationLocation {
    let location = this.availableModifications.find(
      (m) => m.type === value.type
    )!;

    // Create new instance
    location = new (location['constructor'] as any)();

    for (const prop of location.modifiableProperties) {
      location[prop.key] = value.properties[prop.key];
    }

    return location;
  }

  ngOnInit(): void {
    const existingNotificationLocations = this.store
      .selectSnapshot<ModificationModel[]>(ModificationsState)
      .map((m) => m.location)
      .map((l) => JSON.stringify(l));

    this.availableModifications = AllModificationLocations.map(
      (x) => new x()
    ).filter((x) => !existingNotificationLocations.includes(JSON.stringify(x)));
  }

  getForProp(prop: string) {
    return this.modificationForm.get('properties')?.get(prop);
  }

  craftPropertiesFormGroup(
    modifiableProperties: ModifiableProperty[]
  ): FormGroup {
    const fg = new FormGroup({});
    for (const prop of modifiableProperties) {
      fg.addControl(prop.key, new FormControl('', [Validators.required]));
    }

    return fg;
  }

  addModification() {
    if (this.modificationForm.invalid) return;

    const location: ModificationLocation = this.availableModifications.find(
      (m) => m.type === this.type!.value
    )!;

    const properties = this.modificationForm.get('properties')!.value;
    for (const key of Object.keys(properties)) {
      location[key] = properties[key];
    }

    this.store.dispatch(new AddModification(location));

    this.ref.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
