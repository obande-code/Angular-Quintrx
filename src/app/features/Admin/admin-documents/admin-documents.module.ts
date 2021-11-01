import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { AdminDocumentsRoutingModule } from './admin-documents-routing.module';
import { AdminDocumentsComponent } from './admin-documents.component';
import { DataTablesModule } from "angular-datatables";


@NgModule({
    declarations: [AdminDocumentsComponent],
    imports: [CommonModule, AdminDocumentsRoutingModule, FormsModule, ReactiveFormsModule, DataTablesModule],
  })
  export class AdminDocumentsModule {}
  