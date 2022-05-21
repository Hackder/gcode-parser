import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { GCodeFileResolver } from './resolvers/gcode-file.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'front-page' },
  { path: 'front-page', component: FrontPageComponent },
  {
    path: 'editor/:b64filepath',
    component: EditorPageComponent,
    resolve: {
      file: GCodeFileResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
