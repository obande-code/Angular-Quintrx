import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDocumentsComponent } from './admin-documents.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDocumentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDocumentsRoutingModule { }
