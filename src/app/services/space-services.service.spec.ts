import { TestBed } from '@angular/core/testing';

import { SpaceService } from './space-services.service';

describe('SpaceService', () => {
  let service: SpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
