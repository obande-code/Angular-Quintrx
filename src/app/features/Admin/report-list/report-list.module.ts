import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportListRoutingModule } from './report-list-routing.module';
import { ReportListComponent } from './report-list.component';
import { DataTablesModule } from 'angular-datatables';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [ReportListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportListRoutingModule,
    MatProgressBarModule,
    MatProgressSpinnerModule

  
  ]
})
export class ReportListModule { }
