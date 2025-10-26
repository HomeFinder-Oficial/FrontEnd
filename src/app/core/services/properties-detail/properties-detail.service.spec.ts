import { TestBed } from '@angular/core/testing';

import { PropertiesDetailService } from './properties-detail.service';

describe('PropertiesDetailService', () => {
  let service: PropertiesDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertiesDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
