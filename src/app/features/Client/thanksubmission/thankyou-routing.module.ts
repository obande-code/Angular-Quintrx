import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankyouSubComponent } from './thankyou.component';

const routes: Routes = [
  {
    path: '',
    component: ThankyouSubComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThankyouSubRoutingModule { }
