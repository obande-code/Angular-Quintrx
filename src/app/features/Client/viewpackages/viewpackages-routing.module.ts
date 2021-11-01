import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPackagesComponent } from './viewpackages.component';


const routes: Routes = [
  {
    path: '',
    component: ViewPackagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsermanagementRoutingModule {}
