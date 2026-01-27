import { TestBed } from '@angular/core/testing';

import { CurriculumAdminService } from './curriculum-admin.service';

describe('CurriculumAdminService', () => {
  let service: CurriculumAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
