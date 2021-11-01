import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportManagementRoutingModule } from './report-management-routing.module';
import { ReportManagementComponent } from './report-management.component';
import { DataTablesModule } from 'angular-datatables';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    ReportManagementComponent
  ],
  imports: [
    CommonModule,
    ReportManagementRoutingModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule
    
  ]
})
export class ReportManagementModule { }
