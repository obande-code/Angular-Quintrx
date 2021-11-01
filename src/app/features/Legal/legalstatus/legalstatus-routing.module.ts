import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegalstatusComponent } from './legalstatus.component';

const routes: Routes = [
  {
    path: '',
    component: LegalstatusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalStatusRoutingModule {}