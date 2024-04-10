import { TestBed } from '@angular/core/testing';

import { RegraImpostoService } from './regra-imposto.service';

describe('RegraImpostoServiceService', () => {
  let service: RegraImpostoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegraImpostoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
