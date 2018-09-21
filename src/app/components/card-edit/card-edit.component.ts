import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {State} from '../../shared/enums';
import {CardModel} from '../../models/card.model';

@Component({
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  cardForm: FormGroup;
  state: State;
  card: CardModel = new CardModel();

  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    // $ declarada globalmente en global.d.ts
    // @ts-ignore
    $('.menu .item').tab();

    this.card = this.route.snapshot.data['card'];
    // his.card = this.cardService.currentCard;
    this.state = this.card === <CardModel>{} ? State.add : State.edit;
    const front = this.card.front;
    const back = this.card.back;
    this.cardForm = new FormGroup({
      front: new FormControl(front),
      back: new FormControl(back),
    });
  }

}
