import { TestBed } from '@angular/core/testing';

import { PlatformManagementService } from './platform-management.service';

describe('PlatformManagementService', () => {
  let service: PlatformManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
