import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { FilesState } from './files.state';
import { GCodeState } from './gcodes.state';
import { ModificationsState } from './modifications.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([FilesState, GCodeState, ModificationsState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ key: ['files', 'gcodes'] }),
  ],
  exports: [NgxsModule],
})
export class NgxsStoreModule {}
