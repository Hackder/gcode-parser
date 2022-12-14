import { Navigate } from '@ngxs/router-plugin';
import { Action, State, StateContext } from '@ngxs/store';
import { OpenFile } from './files.actions';
import { Base64 } from 'js-base64';

export interface FilesModel {
  recentlyOpened: string[];
  currentFilepath: string;
}

@State<FilesModel>({
  name: 'files',
  defaults: {
    recentlyOpened: [],
    currentFilepath: '',
  },
})
export class FilesState {
  @Action(OpenFile)
  openFile(ctx: StateContext<FilesModel>, { filepath }: OpenFile) {
    const old = ctx
      .getState()
      .recentlyOpened.filter((path) => path !== filepath);
    ctx.patchState({
      recentlyOpened: [filepath, ...old],
      currentFilepath: filepath,
    });

    const encodedFilepath = Base64.encode(filepath);

    ctx.dispatch(new Navigate(['/editor', encodedFilepath]));
  }
}
