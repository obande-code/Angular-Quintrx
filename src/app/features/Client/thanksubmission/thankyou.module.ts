import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankyouSubRoutingModule } from './thankyou-routing.module';
import { ThankyouSubComponent } from './thankyou.component';


@NgModule({
  declarations: [ThankyouSubComponent],
  imports: [
    CommonModule,
    ThankyouSubRoutingModule
  ]
})
export class ThankyouSubModule { }
