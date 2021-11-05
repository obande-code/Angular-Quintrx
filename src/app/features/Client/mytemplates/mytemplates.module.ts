import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MytemplatesRoutingModule } from './mytemplates-routing.module';
import { MytemplatesComponent } from './mytemplates.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [MytemplatesComponent],
  imports: [
    CommonModule,
    MytemplatesRoutingModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule
  ]
})
export class MytemplatesModule { }
