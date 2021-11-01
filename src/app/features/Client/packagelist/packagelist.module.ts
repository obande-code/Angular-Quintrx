import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { PackagelistRoutingModule } from './packagelist-routing.module';
import { PackagelistComponent } from './packagelist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';



@NgModule({
    declarations: [PackagelistComponent],
    imports: [CommonModule,
       PackagelistRoutingModule,
        FormsModule,
         ReactiveFormsModule,
            MatCheckboxModule,
              MatListModule,
                MatCardModule,],
  })
  export class PackageslistModule {}
