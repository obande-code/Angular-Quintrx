import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptancemsgComponent } from './acceptancemsg.component';

const routes: Routes = [
  {
  path: '',
    component: AcceptancemsgComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceptancemsgRoutingModule { }
