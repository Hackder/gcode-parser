import { Action, State, StateContext } from '@ngxs/store';
import { GCodeTemplate } from './gcodes.state';
import {
  AddGCodeToModification,
  AddModification,
  DeleteModification,
  RemoveGCodeFromModification,
} from './modifications.actions';

export interface ModifiableProperty {
  key: string;
  name: string;
  type: 'number' | 'text';
}

export interface ModificationLocation {
  type: string;
  name: string;
  readonly modifiableProperties: ModifiableProperty[];
  [key: string]: any;
}

export class AfterLayerModificationLoaction implements ModificationLocation {
  type = 'after-layer' as const;
  name = 'After Layer' as const;
  modifiableProperties = [
    {
      key: 'layerNumber',
      name: 'Layer Number',
      type: 'number' as const,
    },
  ];
  layerNumber: number = 0;
}

export const AllModificationLocations = [
  AfterLayerModificationLoaction,
] as const;

export interface Insert {
  gcode: GCodeTemplate;
  params: string[];
}

export interface ModificationModel {
  location: ModificationLocation;
  inserts: Insert[];
}

@State<ModificationModel[]>({
  name: 'modifications',
  defaults: [],
})
export class ModificationsState {
  @Action(AddModification)
  addModification(
    ctx: StateContext<ModificationModel[]>,
    action: AddModification
  ) {
    ctx.setState([
      ...ctx.getState(),
      {
        location: action.modification,
        inserts: [],
      },
    ]);
  }

  @Action(DeleteModification)
  deleteModification(
    ctx: StateContext<ModificationModel[]>,
    action: DeleteModification
  ) {
    ctx.setState(ctx.getState().filter((m) => m !== action.modification));
  }

  @Action(AddGCodeToModification)
  addGCodeToModification(
    ctx: StateContext<ModificationModel[]>,
    action: AddGCodeToModification
  ) {
    const modificationIndex = ctx
      .getState()
      .findIndex((m) => m === action.modification);

    const modification: ModificationModel = {
      ...action.modification,
      inserts: [...action.modification.inserts, action.gcode],
    };

    const newModifications = [...ctx.getState()];
    newModifications[modificationIndex] = modification;

    ctx.setState(newModifications);
  }

  @Action(RemoveGCodeFromModification)
  deleteGCodeFromModification(
    ctx: StateContext<ModificationModel[]>,
    action: RemoveGCodeFromModification
  ) {
    const modificationIndex = ctx
      .getState()
      .findIndex((m) => m === action.modification);

    const modification: ModificationModel = {
      ...action.modification,
      inserts: action.modification.inserts.filter((i) => i !== action.gcode),
    };

    const newModifications = [...ctx.getState()];
    newModifications[modificationIndex] = modification;

    ctx.setState(newModifications);
  }
}
