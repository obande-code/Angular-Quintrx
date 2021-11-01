import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceptancemsgRoutingModule } from './acceptancemsg-routing.module';
import { AcceptancemsgComponent } from './acceptancemsg.component';


@NgModule({
  declarations: [AcceptancemsgComponent],
  imports: [
    CommonModule,
    AcceptancemsgRoutingModule
  ]
})
export class AcceptancemsgModule { }
