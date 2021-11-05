import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoriformRoutingModule } from './coriform-routing.module';
import { CoriformComponent } from './coriform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [CoriformComponent],
  imports: [
    CommonModule,
    CoriformRoutingModule,
    FormsModule, AutocompleteLibModule ,ReactiveFormsModule
  ]
})
export class  CoriformModule { }
