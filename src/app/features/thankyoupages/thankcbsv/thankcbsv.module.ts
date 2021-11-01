import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankcbsvRoutingModule } from './thankcbsv-routing.module';
import { ThankcbsvComponent } from './thankcbsv.component';


@NgModule({
  declarations: [ThankcbsvComponent],
  imports: [
    CommonModule,
    ThankcbsvRoutingModule
  ]
})
export class ThankcbsvModule { }
