import { TestBed } from '@angular/core/testing';

import { ViechleService } from './viechle.service';

describe('ViechleService', () => {
  let service: ViechleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViechleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
