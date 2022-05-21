import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FocusTrapModule } from 'primeng/focustrap';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  exports: [
    ButtonModule,
    FocusTrapModule,
    ProgressSpinnerModule,
    ScrollPanelModule,
    DynamicDialogModule,
    InputTextModule,
  ],
  providers: [DialogService],
})
export class PrimeModulesModule {}
