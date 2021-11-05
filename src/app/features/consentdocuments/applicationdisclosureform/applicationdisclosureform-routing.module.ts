import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationdisclosureformComponent } from './applicationdisclosureform.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationdisclosureformComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationdisclosureformRoutingModule { }
