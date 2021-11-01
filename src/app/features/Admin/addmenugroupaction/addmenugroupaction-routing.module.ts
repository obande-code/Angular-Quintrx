import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddmenugroupactionComponent } from './addmenugroupaction.component';

const routes: Routes = [
  {
    path: '',
    component: AddmenugroupactionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmenugroupactionRoutingModule {}