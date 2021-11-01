import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchreportComponent } from './searchreport.component';

const routes: Routes = [
  {
    path: '',
    component: SearchreportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchreportRoutingModule {}