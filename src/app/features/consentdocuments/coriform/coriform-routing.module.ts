import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoriformComponent } from './coriform.component';

const routes: Routes = [
  {
    path: '',
    component: CoriformComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoriformRoutingModule { }
