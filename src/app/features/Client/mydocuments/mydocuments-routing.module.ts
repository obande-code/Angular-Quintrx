import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MydocumentsComponent } from './mydocuments.component';

const routes: Routes = [
  {
    path: '',
    component: MydocumentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MydocumentsRoutingModule { }
