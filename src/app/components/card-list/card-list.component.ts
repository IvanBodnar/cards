import { Component, OnInit } from '@angular/core';
import {CardModel} from '../../models/card.model';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cardsArray: CardModel[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getCards()
      .subscribe(
        (cards: CardModel[]) => this.cardsArray = cards
      );
  }

}
