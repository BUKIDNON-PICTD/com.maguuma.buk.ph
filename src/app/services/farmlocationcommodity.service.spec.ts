import { TestBed } from '@angular/core/testing';

import { FarmlocationcommodityService } from './farmlocationcommodity.service';

describe('FarmlocationcommodityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FarmlocationcommodityService = TestBed.get(FarmlocationcommodityService);
    expect(service).toBeTruthy();
  });
});
