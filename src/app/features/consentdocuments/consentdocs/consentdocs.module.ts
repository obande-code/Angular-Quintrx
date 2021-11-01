import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsentdocsRoutingModule } from './consentdocs-routing.module';
import { ConsentdocsComponent } from './consentdocs.component';



@NgModule({
  declarations: [ConsentdocsComponent],
  imports: [
    CommonModule,
    ConsentdocsRoutingModule,
  ]
})
export class ConsentdocsModule { }
