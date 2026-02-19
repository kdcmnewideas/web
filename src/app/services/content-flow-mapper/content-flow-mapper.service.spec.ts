import { TestBed } from '@angular/core/testing';

import { ContentFlowMapperService } from './content-flow-mapper.service';

describe('ContentFlowMapperService', () => {
  let service: ContentFlowMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentFlowMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
