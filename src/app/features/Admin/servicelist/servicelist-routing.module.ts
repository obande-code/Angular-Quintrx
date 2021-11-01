import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServicelistComponent } from './servicelist.component';

const routes: Routes = [
  {
    path: '',
    component: ServicelistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicelistRoutingModule {}