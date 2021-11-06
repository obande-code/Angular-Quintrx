import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDocumentsRoutingModule } from './client-documents-routing.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ClientDocumentsComponent } from './client-documents.component';
import { ShowDocumentModalComponent } from './show-document-modal/show-document-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientDocumentsComponent,
    ShowDocumentModalComponent
  ],
  imports: [
    CommonModule,
    ClientDocumentsRoutingModule,
    NgxDocViewerModule,
    NgbModalModule,
    FormsModule,
  ]
})
export class ClientDocumentsModule { }
