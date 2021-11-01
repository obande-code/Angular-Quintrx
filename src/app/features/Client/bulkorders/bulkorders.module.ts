import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { BulkordersRoutingModule } from './bulkorders-routing.module';
import { BulkordersComponent } from './bulkorders.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'


@NgModule({
  declarations: [BulkordersComponent],
  imports: [
    CommonModule,
    BulkordersRoutingModule,
    FormsModule, AutocompleteLibModule ,ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule]

})
export class BulkordersModule { }
