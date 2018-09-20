import { Component, OnInit } from '@angular/core';
import {CardService} from '../../services/card.service';
import {CardModel} from '../../models/card.model';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  frontSide = true; // Si es true la tarjeta está de frente.
  cardsArray: CardModel[];
  card: CardModel;
  private themeId: number;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.themeId = +this.route.snapshot.params['id'];
    this.dataService.getCards(this.themeId)
      .subscribe(
        data => {
          this.cardsArray = data;
          this.nextCard();
        }
      );
  }

  flipCard(): void {
    this.frontSide = !this.frontSide;
  }

  nextCard(): void {
    this.frontSide = true;
    this.card = this.cardService.getCard(this.cardsArray);
  }
}
