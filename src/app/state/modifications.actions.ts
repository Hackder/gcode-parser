import { ModificationLocation } from './modifications.state';

export class AddModification {
  static readonly type = '[Modifications] Add Modification';
  constructor(public modification: ModificationLocation) {}
}
