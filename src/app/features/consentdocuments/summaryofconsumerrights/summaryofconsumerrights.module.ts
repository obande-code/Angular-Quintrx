import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryofconsumerrightsRoutingModule } from './summaryofconsumerrights-routing.module';
import { SummaryofconsumerrightsComponent } from './summaryofconsumerrights.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [SummaryofconsumerrightsComponent],
  imports: [
    CommonModule,
    SummaryofconsumerrightsRoutingModule,
    FormsModule, AutocompleteLibModule ,ReactiveFormsModule
  ]
})
export class SummaryofconsumerrightsModule { }
