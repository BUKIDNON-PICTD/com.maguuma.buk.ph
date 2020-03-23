import { TestBed } from '@angular/core/testing';

import { OfflinemanagerService } from './offlinemanager.service';

describe('OfflinemanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfflinemanagerService = TestBed.get(OfflinemanagerService);
    expect(service).toBeTruthy();
  });
});
