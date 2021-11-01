import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentmasterComponent } from './documentmaster.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentmasterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentmasterRoutingModule { }
