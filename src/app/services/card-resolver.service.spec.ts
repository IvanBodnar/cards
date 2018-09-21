import { TestBed, inject } from '@angular/core/testing';

import { CardResolverService } from './card-resolver.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CardResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardResolverService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([CardResolverService], (service: CardResolverService) => {
    expect(service).toBeTruthy();
  }));
});
