import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsergroupsComponent } from './usergroups.component';

const routes: Routes = [
  {
    path: '',
    component: UsergroupsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsergroupsRoutingModule {}