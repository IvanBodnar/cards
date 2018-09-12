import { Component, OnInit } from '@angular/core';
import {CardService} from '../../../services/card.service';
import {CardModel} from '../../../models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card: CardModel;

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
    setTimeout(
      () =>  this.card = this.cardService.getCard(0),
      100
    );
  }

}
