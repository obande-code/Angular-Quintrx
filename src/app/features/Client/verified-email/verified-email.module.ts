import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifiedEmailRoutingModule } from './verified-email-routing.module';
import { VerifiedEmailComponent } from './verified-email.component';


@NgModule({
  declarations: [VerifiedEmailComponent],
  imports: [
    CommonModule,
    VerifiedEmailRoutingModule
  ]
})
export class VerifiedEmailModule { }
