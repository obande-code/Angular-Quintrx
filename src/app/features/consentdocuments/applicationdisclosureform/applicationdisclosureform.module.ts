import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationdisclosureformRoutingModule } from './applicationdisclosureform-routing.module';
import { ApplicationdisclosureformComponent } from './applicationdisclosureform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [ApplicationdisclosureformComponent],
  imports: [
    CommonModule,
    ApplicationdisclosureformRoutingModule,
    FormsModule, AutocompleteLibModule ,ReactiveFormsModule
  ]
})
export class ApplicationdisclosureformModule { }
