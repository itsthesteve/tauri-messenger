import { TestBed } from '@angular/core/testing';

import { InvokeService } from './invoke-service';

describe('InvokeService', () => {
  let service: InvokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
