import { TestBed } from '@angular/core/testing';

import { IngesionService } from './ingestion.service';

describe('IngesionService', () => {
  let service: IngesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
