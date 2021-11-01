import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';

import { DataTablesModule } from 'angular-datatables';
import { AdminDashboardComponent } from './admin-dashboard.component';


@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    DataTablesModule,
    CommonModule,
    AdminDashboardRoutingModule
  ]
})
export class AdminDashboardModule { }
