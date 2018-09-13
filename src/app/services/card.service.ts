import {Injectable, OnInit} from '@angular/core';

import {CardModel} from '../models/card.model';
import {DataService} from './data.service';


@Injectable({
  providedIn: 'root'
})
export class CardService implements OnInit {
  cardsArray: CardModel[];

  _randomIndex(maxNumber: number): number {
    return Math.floor(Math.random() * Math.floor(maxNumber));
  }

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

  ngOnInit(): void {}

  getCard(): CardModel {
    return this.cardsArray[this._randomIndex(this.cardsArray.length)];
  }
}
