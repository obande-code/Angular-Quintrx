import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentmasterRoutingModule } from './documentmaster-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { DataTablesModule } from 'angular-datatables';
import { DocumentmasterComponent } from './documentmaster.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [DocumentmasterComponent],
  imports: [
    DataTablesModule,
    CommonModule,
    DocumentmasterRoutingModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule

    
  ]
})
export class DocumentmasterModule { }
