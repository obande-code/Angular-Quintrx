import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProviderlistComponent } from './providerlist.component';

const routes: Routes = [
  {
    path: '',
    component: ProviderlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderlistRoutingModule {}