import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'front-page' },
  { path: 'front-page', component: FrontPageComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
