import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegalleadsComponent } from './legalleads.component';

const routes: Routes = [
  {
    path: '',
    component: LegalleadsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalLeadsRoutingModule {}