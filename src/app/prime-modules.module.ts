import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FocusTrapModule } from 'primeng/focustrap';

@NgModule({
  exports: [ButtonModule, FocusTrapModule],
})
export class PrimeModulesModule {}
