import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageMenuRoutingModule } from './manage-menu-routing.module';

import { DataTablesModule } from 'angular-datatables';
import { ManageMenuComponent } from './manage-menu.component';


@NgModule({
  declarations: [ManageMenuComponent],
  imports: [
    DataTablesModule,
    CommonModule,
    ManageMenuRoutingModule
  ]
})
export class ManageMenuModule { }
