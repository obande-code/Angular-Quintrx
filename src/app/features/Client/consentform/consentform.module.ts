import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsentformRoutingModule } from './consentform-routing.module';
import { ConsentformComponent } from './consentform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [ConsentformComponent],
  imports: [
    CommonModule,
    ConsentformRoutingModule,
    FormsModule, AutocompleteLibModule ,ReactiveFormsModule
  ]
})
export class ConsentformModule { }
