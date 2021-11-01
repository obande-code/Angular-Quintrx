import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDocumentsComponent } from './client-documents.component';

const routes: Routes = [
  {
    path: '',
    component: ClientDocumentsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientDocumentsRoutingModule { }
