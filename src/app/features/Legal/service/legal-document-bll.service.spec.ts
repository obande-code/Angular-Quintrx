import { TestBed } from '@angular/core/testing';

import { LegalDocumentBllService } from './legal-document-bll.service';

describe('LegalDocumentBllService', () => {
  let service: LegalDocumentBllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalDocumentBllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
