import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { ConsentRoutingModule } from './consent-routing.module';
import { ConsentComponent } from './consent.component';


@NgModule({
    declarations: [ConsentComponent],
    imports: [CommonModule, ConsentRoutingModule, FormsModule, AutocompleteLibModule ,ReactiveFormsModule],
  })
  export class ConsentModule {}
