import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ssa89Component } from './ssa89.component';

const routes: Routes = [
  {
    path: '',
    component: Ssa89Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ssa89RoutingModule { }
