import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsermanagementComponent } from './usermanagement.component';

const routes: Routes = [
  {
    path: '',
    component: UsermanagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsermanagementRoutingModule {}