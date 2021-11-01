import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankcbsvComponent } from './thankcbsv.component';

const routes: Routes = [
  {
    path: '',
    component: ThankcbsvComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThankcbsvRoutingModule { }
