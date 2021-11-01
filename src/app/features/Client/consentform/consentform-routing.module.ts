import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsentformComponent } from './consentform.component';

const routes: Routes = [
  {
    path: '',
    component: ConsentformComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsentformRoutingModule { }
