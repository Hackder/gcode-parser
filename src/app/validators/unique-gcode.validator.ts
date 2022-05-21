import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Store } from '@ngxs/store';
import { GCodeState, GCodeTemplate } from '../state/gcodes.state';

export class UniqueGCodeValidator {
  static createValidator(store: Store): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const gcodes: GCodeTemplate[] = store.selectSnapshot(GCodeState);

      const exists = gcodes.some((gcode: any) => gcode.gcode === control.value);

      return exists ? { uniqueGCode: true } : null;
    };
  }
}
