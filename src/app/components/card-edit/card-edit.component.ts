import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {State} from '../../shared/enums';
import {CardService} from '../../services/card.service';
import {CardModel} from '../../models/card.model';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  cardForm: FormGroup;
  state: State;
  card: CardModel;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) { }

  ngOnInit() {
    // $ declarada globalmente en global.d.ts
    // @ts-ignore
    $('.menu .item').tab();

    this.card = this.cardService.currentCard;
    this.cardForm = new FormGroup({
      front: new FormControl(this.card.front),
      back: new FormControl(this.card.back),
    });
  }

}
