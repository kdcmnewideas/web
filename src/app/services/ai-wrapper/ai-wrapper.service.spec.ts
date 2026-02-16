import { TestBed } from '@angular/core/testing';

import { AiWrapperService } from './ai-wrapper.service';

describe('AiWrapperService', () => {
  let service: AiWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
