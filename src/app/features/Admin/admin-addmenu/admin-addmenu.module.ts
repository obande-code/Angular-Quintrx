import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAddmenuRoutingModule } from './admin-addmenu-routing.module';
import { AdminAddmenuComponent } from './admin-addmenu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminAddmenuComponent],
  imports: [
    CommonModule,
    AdminAddmenuRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminAddmenuModule { }
