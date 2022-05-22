import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FocusTrapModule } from 'primeng/focustrap';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  exports: [
    ButtonModule,
    FocusTrapModule,
    ProgressSpinnerModule,
    ScrollPanelModule,
    DynamicDialogModule,
    InputTextModule,
    AccordionModule,
    DropdownModule,
    ConfirmDialogModule,
  ],
  providers: [DialogService, ConfirmationService],
})
export class PrimeModulesModule {}
