import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployementverifyComponent } from './employementverify.component';

const routes: Routes = [
  {
    path: '',
    component: EmployementverifyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployementverifyRoutingModule { }
