import { Component, OnInit } from '@angular/core';
import {CardModel} from '../../models/card.model';
import {DataService} from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {CardService} from '../../services/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cardsArray: CardModel[];
  themeId: number;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.themeId = +this.route.snapshot.params['themeId'];
    this.dataService.getCards(this.themeId)
      .subscribe(
        (cards: CardModel[]) => this.cardsArray = cards
      );

  }

  editClicked(card: CardModel) {
    this.cardService.currentCard = card;
  }

  newClicked() {
    this.cardService.currentCard = new CardModel();
  }
}
