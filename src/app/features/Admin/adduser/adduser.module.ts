import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { AdduserRoutingModule } from './adduser-routing.module';
import { AdduserComponent } from './adduser.component';


@NgModule({
    declarations: [AdduserComponent],
    imports: [CommonModule, AdduserRoutingModule, FormsModule, ReactiveFormsModule, AutocompleteLibModule],
  })
  export class AdduserModule {}
  