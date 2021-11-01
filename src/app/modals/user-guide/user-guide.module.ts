import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserGuideComponent } from './user-guide.component';



@NgModule({
  declarations: [UserGuideComponent],
  imports: [CommonModule, PdfViewerModule],
  exports: [UserGuideComponent],
  entryComponents: [UserGuideComponent],
})
export class UserGuideModule { }
