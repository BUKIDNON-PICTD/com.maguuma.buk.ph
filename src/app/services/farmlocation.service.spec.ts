import { TestBed } from '@angular/core/testing';

import { FarmlocationService } from './farmlocation.service';

describe('FarmlocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FarmlocationService = TestBed.get(FarmlocationService);
    expect(service).toBeTruthy();
  });
});
