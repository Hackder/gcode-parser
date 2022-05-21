import { Action, State, StateContext } from '@ngxs/store';
import { v4 } from 'uuid';
import {
  AddGCodeTemplate,
  DeleteGCodeTemplate,
  EditGCodeTemplate,
} from './gcodes.actions';

export interface GCodeTemplate {
  id: string;
  description: string;
  gcode: string;
}

@State<GCodeTemplate[]>({
  name: 'gcodes',
  defaults: [],
})
export class GCodeState {
  @Action(AddGCodeTemplate)
  addGCodeTemplate(
    ctx: StateContext<GCodeTemplate[]>,
    { gcodeTemplate, description }: AddGCodeTemplate
  ) {
    ctx.setState([
      ...ctx.getState(),
      {
        id: v4(),
        description,
        gcode: gcodeTemplate,
      },
    ]);
  }

  @Action(EditGCodeTemplate)
  editGCodeTemplate(
    ctx: StateContext<GCodeTemplate[]>,
    { id, gcode }: EditGCodeTemplate
  ) {
    ctx.setState(
      ctx.getState().map((gcodeTemplate: GCodeTemplate) => {
        if (gcodeTemplate.id === id) {
          return {
            ...gcodeTemplate,
            ...gcode,
            id: id,
          };
        }
        return gcodeTemplate;
      })
    );
  }

  @Action(DeleteGCodeTemplate)
  deleteGCodeTemplate(
    ctx: StateContext<GCodeTemplate[]>,
    { id }: DeleteGCodeTemplate
  ) {
    ctx.setState(
      ctx
        .getState()
        .filter((gcodeTemplate: GCodeTemplate) => gcodeTemplate.id !== id)
    );
  }
}
