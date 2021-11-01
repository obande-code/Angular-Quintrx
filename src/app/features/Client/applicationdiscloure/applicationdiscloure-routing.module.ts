import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationdiscloureComponent } from './applicationdiscloure.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationdiscloureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationdiscloureRoutingModule { }
