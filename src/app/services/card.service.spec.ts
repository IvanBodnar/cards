import { TestBed, inject } from '@angular/core/testing';

import { CardService } from './card.service';

describe('Cardservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardService]
    });
  });

  it('should be created', inject([CardService], (service: CardService) => {
    expect(service).toBeTruthy();
  }));
});
