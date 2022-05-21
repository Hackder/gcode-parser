import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FocusTrapModule } from 'primeng/focustrap';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  exports: [ButtonModule, FocusTrapModule, ProgressSpinnerModule],
})
export class PrimeModulesModule {}
