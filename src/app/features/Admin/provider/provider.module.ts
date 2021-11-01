import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';
import { DataTablesModule } from "angular-datatables";


@NgModule({
    declarations: [ProviderComponent],
    imports: [CommonModule, ProviderRoutingModule, FormsModule, ReactiveFormsModule, DataTablesModule],
  })
  export class ProviderModule {}
  