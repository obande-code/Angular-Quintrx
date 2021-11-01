import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { UsermanagementRoutingModule } from './viewpackages-routing.module';
import { DataTablesModule } from "angular-datatables";
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewPackagesComponent } from './viewpackages.component';


@NgModule({
    declarations: [ViewPackagesComponent],
    imports: [CommonModule, UsermanagementRoutingModule, FormsModule, ReactiveFormsModule,
      MatTableModule, MatToolbarModule
      , MatInputModule, MatPaginatorModule,MatSortModule, MatFormFieldModule],
  })
  export class ViewPackagesModule {}
