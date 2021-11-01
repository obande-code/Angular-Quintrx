import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationdiscloureRoutingModule } from './applicationdiscloure-routing.module';
import { ApplicationdiscloureComponent } from './applicationdiscloure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [ApplicationdiscloureComponent],
  imports: [
    CommonModule,
    ApplicationdiscloureRoutingModule,
    FormsModule, AutocompleteLibModule ,ReactiveFormsModule
  ]
})
export class ApplicationdiscloureModule { }
