import { ModificationLocation, ModificationModel } from './modifications.state';

export class AddModification {
  static readonly type = '[Modifications] Add Modification';
  constructor(public modification: ModificationLocation) {}
}

export class DeleteModification {
  static readonly type = '[Modifications] Delete Modification';
  constructor(public modification: ModificationModel) {}
}
