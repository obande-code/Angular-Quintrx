import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BulkordersComponent } from './bulkorders.component';

const routes: Routes = [
  {
    path: '',
    component: BulkordersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkordersRoutingModule { }
