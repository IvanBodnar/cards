import {Injectable, OnInit} from '@angular/core';

import {CardModel} from '../models/card.model';


@Injectable({
  providedIn: 'root'
})
export class CardService implements OnInit {

  _randomIndex(maxNumber: number): number {
    return Math.floor(Math.random() * Math.floor(maxNumber));
  }

  constructor() {}

  ngOnInit(): void {}

  getCard(cardsArray: CardModel[]): CardModel {
    return cardsArray[this._randomIndex(cardsArray.length)];
  }

}
