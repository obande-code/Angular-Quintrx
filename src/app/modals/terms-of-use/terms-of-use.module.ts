import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfUseComponent } from './terms-of-use.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [TermsOfUseComponent],
  imports: [CommonModule, PdfViewerModule],
  exports: [TermsOfUseComponent],
  entryComponents: [TermsOfUseComponent],
})
export class TermsOfUseModule {}
