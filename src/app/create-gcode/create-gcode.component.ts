import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteGCodeTemplate } from '../state/gcodes.actions';
import { GCodeTemplate } from '../state/gcodes.state';
import { UniqueGCodeValidator } from '../validators/unique-gcode.validator';

@Component({
  selector: 'app-create-gcode',
  templateUrl: './create-gcode.component.html',
  styleUrls: ['./create-gcode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGCodeComponent {
  gcodeForm = new FormGroup({
    gcode: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  editMode = false;

  get gcode() {
    return this.gcodeForm.get('gcode');
  }

  get description() {
    return this.gcodeForm.get('description');
  }

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private store: Store
  ) {
    if (config.data?.gcode) {
      this.gcode?.setValue(config.data.gcode);
    }

    if (config.data?.description) {
      this.description?.setValue(config.data.description);
    }

    if (config.data?.id) {
      console.log(config.data.id);
      this.editMode = true;
    } else {
      this.gcode?.addValidators(
        UniqueGCodeValidator.createValidator(this.store)
      );
    }
  }

  createGCode() {
    if (this.gcodeForm.invalid) return;

    const gcodeTemplate: GCodeTemplate = {
      id: '',
      gcode: this.gcode!.value,
      description: this.description!.value,
    };

    this.ref.close(gcodeTemplate);
  }

  deleteGCode() {
    if (!this.config.data?.id) return;
    this.store.dispatch(new DeleteGCodeTemplate(this.config.data.id));
    this.ref.close();
  }
}
