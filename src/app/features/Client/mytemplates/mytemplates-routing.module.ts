import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MytemplatesComponent } from './mytemplates.component';

const routes: Routes = [
  {
    path: '',
    component: MytemplatesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MytemplatesRoutingModule { }
