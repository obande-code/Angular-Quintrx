import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewpackageComponent } from './viewpackage.component';

const routes: Routes = [
  {
    path: '',
    component: ViewpackageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewpackageRoutingModule { }
