import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyinvoiceRoutingModule } from './myinvoice-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyinvoiceComponent } from './myinvoice.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [MyinvoiceComponent],
  imports: [
    CommonModule,
    MyinvoiceRoutingModule,
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
export class MyinvoiceModule { }
