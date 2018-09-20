import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';

import {State} from '../../shared/enums';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  cardForm: FormGroup;
  state: State;
  themeId: number;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    // $ declarada globalmente en global.d.ts
    // @ts-ignore
    $('.menu .item').tab();

    this.themeId = this.themeService.currentThemeId;
    this.cardForm = new FormGroup({
      front: new FormControl(),
      back: new FormControl(),
    });
  }

}
