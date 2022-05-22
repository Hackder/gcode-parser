import {
  ModificationLocation,
  ModificationModel,
  Insert,
} from './modifications.state';

export class AddModification {
  static readonly type = '[Modifications] Add Modification';
  constructor(public modification: ModificationLocation) {}
}

export class DeleteModification {
  static readonly type = '[Modifications] Delete Modification';
  constructor(public modification: ModificationModel) {}
}

export class AddGCodeToModification {
  static readonly type = '[Modifications] Add GCode To Modification';
  constructor(public modification: ModificationModel, public gcode: Insert) {}
}

export class RemoveGCodeFromModification {
  static readonly type = '[Modifications] Remove GCode From Modification';
  constructor(public modification: ModificationModel, public gcode: Insert) {}
}
