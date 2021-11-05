import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryofconsumerrightsComponent } from './summaryofconsumerrights.component';

const routes: Routes = [
  {
    path: '',
    component: SummaryofconsumerrightsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryofconsumerrightsRoutingModule { }
