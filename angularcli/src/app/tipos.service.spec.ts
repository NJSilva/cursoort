import { TestBed } from '@angular/core/testing';

import { TiposService } from './tipos.service';

describe('TiposService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiposService = TestBed.get(TiposService);
    expect(service).toBeTruthy();
  });
});
