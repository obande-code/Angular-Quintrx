import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [CommonModule, PdfViewerModule],
  exports: [PrivacyPolicyComponent],
  entryComponents: [PrivacyPolicyComponent],
})
export class PrivacyPolicyModule {}
