import { TestBed } from '@angular/core/testing';

import { ClientDocumentBllService } from './client-document-bll.service';

describe('ClientDocumentBllService', () => {
  let service: ClientDocumentBllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientDocumentBllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
