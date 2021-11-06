import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatExpansionModule} from '@angular/material/expansion';

import { FaqRoutingModule } from './faq-routing.module';
import { NgxMaterialFaqModule } from 'ngx-material-faq';
import { FaqComponent } from './faq.component'
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    NgxMaterialFaqModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSliderModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatExpansionModule
  ],
})
export class FaqModule {

 }
