import { TestBed } from '@angular/core/testing';

import { ServiceReniecService } from './service-reniec.service';

describe('ServiceReniecService', () => {
  let service: ServiceReniecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceReniecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
