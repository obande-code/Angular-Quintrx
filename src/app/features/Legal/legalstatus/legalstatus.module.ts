import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { LegalStatusRoutingModule } from './legalstatus-routing.module';
import { LegalstatusComponent } from './legalstatus.component';
import { DataTablesModule } from "angular-datatables";


@NgModule({
    declarations: [LegalstatusComponent],
    imports: [CommonModule, LegalStatusRoutingModule, FormsModule, ReactiveFormsModule, DataTablesModule],
  })
  export class LegalstatusModule {}
  