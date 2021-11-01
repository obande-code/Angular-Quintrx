import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { AgreementRoutingModule } from './agreement-routing.module';
import { AgreementComponent } from './agreement.component';


@NgModule({
    declarations: [AgreementComponent],
    imports: [CommonModule, AgreementRoutingModule, FormsModule, ReactiveFormsModule],
  })
  export class AgreementModule {}
  