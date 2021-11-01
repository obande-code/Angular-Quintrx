import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderModule } from '../../../components/header/header.module';




import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';

@NgModule({
  declarations: [ForgetPasswordComponent],
  imports: [CommonModule, ForgetPasswordRoutingModule, FormsModule],
})
export class ForgetPasswordModule {}
