import { TestBed } from '@angular/core/testing';

import { FarmlocationlivestockService } from './farmlocationlivestock.service';

describe('FarmlocationlivestockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FarmlocationlivestockService = TestBed.get(FarmlocationlivestockService);
    expect(service).toBeTruthy();
  });
});
