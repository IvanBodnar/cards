import { Component, OnInit } from '@angular/core';
import {CardService} from '../../../services/card.service';
import {CardModel} from '../../../models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  frontSide = true; // Si es true la tarjeta está de frente.
  card: CardModel;

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
    // setTimeOut para esperar a que se inicialice CardService.
    setTimeout(
      () =>  this.card = this.cardService.getCard(0),
      100
    );
  }

  flipCard() {
    this.frontSide = !this.frontSide;
  }
}
