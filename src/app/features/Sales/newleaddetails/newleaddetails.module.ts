import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { NewleaddetailsRoutingModule } from './newleaddetails-routing.module';
import { NewleaddetailsComponent } from './newleaddetails.component';
import { DataTablesModule } from "angular-datatables";


@NgModule({
    declarations: [NewleaddetailsComponent],
    imports: [CommonModule, NewleaddetailsRoutingModule, FormsModule, ReactiveFormsModule, DataTablesModule],
  })
  export class NewleaddetailsModule {}
  