import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { UserGuideModule } from 'src/app/modals/user-guide/user-guide.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, NgbCarouselModule, UserGuideModule],
  exports: [FooterComponent],
})
export class FooterModule {}
