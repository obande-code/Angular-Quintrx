import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { NgxMaterialFaqModule } from 'ngx-material-faq';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, NgxMaterialFaqModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
