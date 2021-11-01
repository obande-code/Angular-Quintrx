import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderPackageComponent } from './order-package.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPackageComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPackageRoutingModule { }
