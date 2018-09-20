import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  cardForm: FormGroup;

  constructor() { }

  ngOnInit() {
    // $ declarada globalmente en global.d.ts
    // @ts-ignore
    $('.menu .item')
      .tab()
    ;
  }

}
