import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { PrimeModulesModule } from './prime-modules.module';
import { NgxsStoreModule } from './state/ngxs-store.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { GCodeListComponent } from './gcode-list/gcode-list.component';
import { GCodeListItemComponent } from './gcode-list-item/gcode-list-item.component';
import { CreateGCodeComponent } from './create-gcode/create-gcode.component';
import { ModificationsComponent } from './modifications/modifications.component';
import { ModificationDialogComponent } from './modification-dialog/modification-dialog.component';
import { ModificationComponent } from './modification/modification.component';
import { GCodeInsertDialogComponent } from './gcode-insert-dialog/gcode-insert-dialog.component';
import { GCodeInsertListComponent } from './gcode-insert-list/gcode-insert-list.component';
import { GCodeInsertViewComponent } from './gcode-insert-view/gcode-insert-view.component';
import { ModificationFormattedNamePipe } from './pipes/modification-formatted-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    EditorPageComponent,
    LoadingOverlayComponent,
    GCodeListComponent,
    GCodeListItemComponent,
    CreateGCodeComponent,
    ModificationsComponent,
    ModificationDialogComponent,
    ModificationComponent,
    GCodeInsertDialogComponent,
    GCodeInsertListComponent,
    GCodeInsertViewComponent,
    ModificationFormattedNamePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeModulesModule,
    NgxsStoreModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
