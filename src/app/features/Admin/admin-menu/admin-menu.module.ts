import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMenuRoutingModule } from './admin-menu-routing.module';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminMenuRoutingModule,
    MatCheckboxModule,
              MatListModule,
                MatCardModule,
  ]
})
export class AdminMenuModule { }
