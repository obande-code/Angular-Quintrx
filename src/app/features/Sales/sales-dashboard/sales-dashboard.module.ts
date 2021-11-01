import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesDashboardRoutingModule } from './sales-dashboard-routing.module';
import { SalesDashboardComponent } from './sales-dashboard.component';


@NgModule({
  declarations: [SalesDashboardComponent],
  imports: [
    CommonModule,
    SalesDashboardRoutingModule
  ]
})
export class SalesDashboardModule { }
