import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrugscreeningComponent } from './drugscreening.component';

const routes: Routes = [
  {
    path: '',
    component: DrugscreeningComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugscreeningRoutingModule { }
