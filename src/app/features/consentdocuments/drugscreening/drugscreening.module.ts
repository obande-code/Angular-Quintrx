import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugscreeningRoutingModule } from './drugscreening-routing.module';
import { DrugscreeningComponent } from './drugscreening.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [DrugscreeningComponent],
  imports: [
    CommonModule,
    DrugscreeningRoutingModule,
    FormsModule, AutocompleteLibModule ,ReactiveFormsModule
  ]
})
export class DrugscreeningModule { }
