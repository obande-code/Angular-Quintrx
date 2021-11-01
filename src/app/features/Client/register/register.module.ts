import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { TermsOfUseModule } from '../../../modals/terms-of-use/terms-of-use.module';
import { PrivacyPolicyModule } from '../../../modals/privacy-policy/privacy-policy.module';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    NgbModalModule,
    TermsOfUseModule,
    PrivacyPolicyModule,
    HttpClientModule
  ],
})
export class RegisterModule {}
