import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployementverifyRoutingModule } from './employementverify-routing.module';
import { EmployementverifyComponent } from './employementverify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [EmployementverifyComponent],
  imports: [
    CommonModule,
    EmployementverifyRoutingModule,
    FormsModule, AutocompleteLibModule ,ReactiveFormsModule
  ]
})
export class EmployementverifyModule { }
