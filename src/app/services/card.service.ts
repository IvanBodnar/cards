import {Injectable, OnInit} from '@angular/core';

import {CardModel} from '../models/card.model';
import {DataService} from './data.service';


@Injectable({
  providedIn: 'root'
})
export class CardService implements OnInit {
  cardsArray: CardModel[];

  constructor(
    private dataService: DataService
  ) {
    this.dataService.getCards()
      .subscribe(
        (cards: CardModel[]) => {
          this.cardsArray = cards;
        }
      );
  }

  ngOnInit(): void {

  }

  getCard(index: number) {
    return this.cardsArray[index];
  }
}
