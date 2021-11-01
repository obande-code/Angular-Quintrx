import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewleadsComponent } from './newleads.component';

const routes: Routes = [
  {
    path: '',
    component: NewleadsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewleadsRoutingModule {}