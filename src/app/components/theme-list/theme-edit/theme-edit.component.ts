import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {ThemeModel} from '../../../models/theme.model';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css']
})
export class ThemeEditComponent implements OnInit {
  theme: ThemeModel;
  themeId: number;
  themeForm: FormGroup;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.themeId = this.route.snapshot.params['id'];
    this.themeForm = new FormGroup({
      themeName: new FormControl()
    });
  }

}
