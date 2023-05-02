import { TestBed } from '@angular/core/testing';

import { TenancyService } from './tenancy.service';

describe('TenancyService', () => {
  let service: TenancyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenancyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
