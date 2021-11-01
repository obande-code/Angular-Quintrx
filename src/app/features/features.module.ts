import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterModule } from '../components/footer/footer.module';
import { HeaderModule } from '../components/header/header.module'

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';


import { OrderReportService } from '../APIs/order-report.service'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LegaldocsComponent } from './Legal/legaldocs/legaldocs.component';
import { AdminMenuComponent } from './Admin/admin-menu/admin-menu.component';
import { ChangePasswordComponent } from './Client/change-password/change-password.component';
import { ProfileDetailsComponent } from './Client/profile-details/profile-details.component';
import { LogoutComponent } from './Client/logout/logout.component';
import { ViewpackageComponent } from './Client/viewpackage/viewpackage.component';




@NgModule({
  declarations: [
    FeaturesComponent,
    LegaldocsComponent,
    AdminMenuComponent,
    ChangePasswordComponent,
    ProfileDetailsComponent,
    LogoutComponent,
    ViewpackageComponent],
  imports: [CommonModule, FeaturesRoutingModule, FooterModule, HeaderModule, FormsModule, ReactiveFormsModule],
  providers: [OrderReportService]
})
export class FeaturesModule { }
