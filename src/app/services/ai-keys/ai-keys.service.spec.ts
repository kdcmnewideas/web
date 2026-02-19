import { TestBed } from '@angular/core/testing';

import { AiKeysService } from './ai-keys.service';

describe('AiKeysService', () => {
  let service: AiKeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiKeysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
