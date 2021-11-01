import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddmenuComponent } from './admin-addmenu.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAddmenuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAddmenuRoutingModule { }
