import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {State} from '../../shared/enums';
import {CardModel} from '../../models/card.model';
import {DataService} from '../../services/data.service';


@Component({
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  cardForm: FormGroup;
  state: State;
  card: CardModel = new CardModel();

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {  }

  ngOnInit() {
    // $ declarada globalmente en global.d.ts
    // @ts-ignore
    $('.menu .item').tab();

    this.card = this.route.snapshot.data['card'];
    this.state = this.card.id === undefined ? State.add : State.edit;
    const front = this.card.front;
    const back = this.card.back;
    this.cardForm = new FormGroup({
      front: new FormControl(front, [Validators.required]),
      back: new FormControl(back, [Validators.required]),
    }, { validators: this.sameContentValidator.bind(this) });
  }

  save() {
    if (this.state === State.add) {
      this.card.id = undefined;
      this.card.theme = this.route.snapshot.params['themeId'];
      this.dataService
        .saveCard( Object.assign( this.card, this.cardForm.value ) )
        .subscribe(
          (card: CardModel) => card,
          error1 => console.log(error1)
        );
    } else if (this.state === State.edit) {
      this.dataService
        .saveCard( Object.assign( this.card, this.cardForm.value ) )
        .subscribe(
          (card: CardModel) => card,
          error1 => console.log(error1)
        );
    } else {
      throw new Error('cardForm state is undefined');
    }
  }

  sameContentValidator(control: FormGroup): ValidationErrors | null {
    if (this.state === State.edit) {
      const front = control.get('front');
      const back = control.get('back');
      return front.value === this.card.front && back.value === this.card.back ? { 'sameContent': true } : null;
    }
    return null;
  }
}
