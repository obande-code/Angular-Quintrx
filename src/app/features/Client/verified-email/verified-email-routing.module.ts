import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifiedEmailComponent } from './verified-email.component';

const routes: Routes = [
  {
    path: '',
    component: VerifiedEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifiedEmailRoutingModule { }
