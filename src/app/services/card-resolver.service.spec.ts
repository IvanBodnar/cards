import { TestBed, inject } from '@angular/core/testing';

import { CardResolverService } from './card-resolver.service';

describe('CardResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardResolverService]
    });
  });

  it('should be created', inject([CardResolverService], (service: CardResolverService) => {
    expect(service).toBeTruthy();
  }));
});
