import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportListRoutingModule } from './report-list-routing.module';
import { ReportListComponent } from './report-list.component';
import { DataTablesModule } from 'angular-datatables';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [ReportListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportListRoutingModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule

  
  ]
})
export class ReportListModule { }
