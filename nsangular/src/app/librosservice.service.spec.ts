import { TestBed } from '@angular/core/testing';

import { LibrosserviceService } from './librosservice.service';

describe('LibrosserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibrosserviceService = TestBed.get(LibrosserviceService);
    expect(service).toBeTruthy();
  });
});
