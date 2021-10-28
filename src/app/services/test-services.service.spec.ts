import { TestBed } from '@angular/core/testing';

import { TestServicesService } from './test-services.service';

describe('TestServicesService', () => {
  let service: TestServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
