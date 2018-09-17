import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {ThemeModel} from '../../../models/theme.model';
import {DataService} from '../../../services/data.service';


enum State {
  add = 'add',
  edit = 'edit'
}

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css']
})
export class ThemeEditComponent implements OnInit {
  theme = new ThemeModel;
  themeId: number;
  themeForm: FormGroup;
  state: State;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.themeId = +this.route.snapshot.params['id'];
    this.state = this.themeId === 0 ? State.add : State.edit;
    this.themeForm = new FormGroup({
      name: new FormControl()
    });
  }

  save() {
    if (this.state === State.add) {
      this.theme.id = undefined;
      this.dataService
        .saveTheme( Object.assign( this.theme, this.themeForm.value ) )
        .subscribe(
          (theme) => theme
        );
    }
  }

}
