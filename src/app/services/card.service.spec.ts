import { TestBed, inject } from '@angular/core/testing';

import { CardService } from './card.service';
import {of} from 'rxjs';
import {CardModel} from '../models/card.model';

describe('Cardservice', () => {
  let cardService: CardService;
  let mockDataService;
  let card: CardModel;
  const CARDS: CardModel[] = [
    {
      id: 1,
      front: 'front',
      back: 'back',
      themeId: 1
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardService]
    });
  });

  beforeEach(() => {
    mockDataService = jasmine.createSpyObj([
      'getThemes',
      'getCards'
    ]);

    mockDataService.getCards.and.returnValue(of(CARDS));

    cardService = new CardService(mockDataService);
  });

  describe('CardService Creation', () => {
    it('should be created', () => {
      expect(cardService).toBeTruthy();
    });
  });

  describe('cardsArray', () => {
    it('should have one CardModel object', () => {
      expect(cardService.cardsArray.length).toBe(1);
    });
  });

  describe('getCard()', () => {
    it('should return one CardModel object', () => {
      card = cardService.getCard();
      expect(card).toEqual(CARDS[0]);
    });
  });

});
