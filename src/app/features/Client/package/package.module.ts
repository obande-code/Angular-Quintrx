import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';

import { DataTablesModule } from "angular-datatables";
import { PackageComponent } from './package.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ PackageComponent],
  imports: [
    CommonModule,
    PackageRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PackageModule { }
