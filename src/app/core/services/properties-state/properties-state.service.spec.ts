import { TestBed } from '@angular/core/testing';

import { PropertiesStateService } from './properties-state.service';

describe('PropertiesStateService', () => {
  let service: PropertiesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertiesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
