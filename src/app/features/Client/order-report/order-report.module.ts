import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { OrderReportRoutingModule } from './order-report-routing.module';
import { OrderReportComponent } from './order-report.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'


@NgModule({
  declarations: [OrderReportComponent],
  imports: [
    CommonModule,
    OrderReportRoutingModule,
    FormsModule, AutocompleteLibModule ,ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule]

})
export class OrderReportModule { }
