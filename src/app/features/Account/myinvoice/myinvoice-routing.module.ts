import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyinvoiceComponent } from './myinvoice.component';

const routes: Routes = [
  {
    path: '',
    component: MyinvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyinvoiceRoutingModule { }
