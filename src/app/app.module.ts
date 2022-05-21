import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FrontPageComponent } from './front-page/front-page.component';
import { PrimeModulesModule } from './prime-modules.module';
import { NgxsStoreModule } from './state/ngxs-store.module';
import { EditorPageComponent } from './editor-page/editor-page.component';

@NgModule({
  declarations: [AppComponent, FrontPageComponent, EditorPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeModulesModule,
    NgxsStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
