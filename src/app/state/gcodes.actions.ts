import { GCodeTemplate } from './gcodes.state';

export class AddGCodeTemplate {
  static readonly type = '[GCodes] Add GCode Template';
  constructor(public gcodeTemplate: string, public description: string) {}
}

export class EditGCodeTemplate {
  static readonly type = '[GCodes] Edit GCode Template';
  constructor(public id: string, public gcode: GCodeTemplate) {}
}

export class DeleteGCodeTemplate {
  static readonly type = '[GCodes] Delete GCode Template';
  constructor(public id: string) {}
}
