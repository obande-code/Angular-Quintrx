import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsentdocsComponent } from './consentdocs.component';

const routes: Routes = [
  {
    path: '',
    component: ConsentdocsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsentdocsRoutingModule { }
