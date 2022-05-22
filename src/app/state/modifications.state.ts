import { Action, State, StateContext } from '@ngxs/store';
import { GCodeTemplate } from './gcodes.state';
import { AddModification, DeleteModification } from './modifications.actions';

export interface ModifiableProperty {
  key: string;
  name: string;
  type: 'number' | 'text';
}

export interface ModificationLocation {
  type: string;
  name: string;
  getFormattedName(): string;
  readonly modifiableProperties: ModifiableProperty[];
  [key: string]: any;
}

export class AfterLayerModificationLoaction implements ModificationLocation {
  type = 'after-layer' as const;
  name = 'After Layer' as const;
  getFormattedName = (): string => `${this.name} ${this.layerNumber}`;
  modifiableProperties = [
    {
      key: 'layerNumber',
      name: 'Layer Number',
      type: 'number' as const,
    },
  ];
  layerNumber: number = 0;
}

export const AllModificationLocations = [AfterLayerModificationLoaction];

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
}
