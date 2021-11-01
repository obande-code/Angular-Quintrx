import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewleaddetailsComponent } from './newleaddetails.component';

const routes: Routes = [
  {
    path: '',
    component: NewleaddetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewleaddetailsRoutingModule {}