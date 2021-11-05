import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ssa89RoutingModule } from './ssa89-routing.module';
import { Ssa89Component } from './ssa89.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [Ssa89Component],
  imports: [
    CommonModule,
    Ssa89RoutingModule,
    FormsModule, AutocompleteLibModule ,ReactiveFormsModule
  ]
})
export class Ssa89Module { }
