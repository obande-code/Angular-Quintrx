import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterModule } from '../../components/footer/footer.module';
import { HeaderModule } from '../../components/header/header.module'

import { ThankyoupagesRoutingModule } from './thankyoupages-routing.module';
import { ThankyoupagesComponent } from './thankyoupages.component';

// import { OrderReportComponent } from './order-report/order-report.component';

import { OrderReportService } from '../../APIs/order-report.service'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ThankyoupagesComponent,
  
  
    ],
  imports: [CommonModule, ThankyoupagesRoutingModule, FormsModule, ReactiveFormsModule],
  providers: []
})
export class ThankyoupagesModule { }
