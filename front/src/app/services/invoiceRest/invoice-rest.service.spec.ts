import { TestBed } from '@angular/core/testing';

import { InvoiceRestService } from './invoice-rest.service';

describe('InvoiceRestService', () => {
  let service: InvoiceRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
