import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {ThemeModel} from '../../../models/theme.model';
import {DataService} from '../../../services/data.service';
import {State} from '../../../shared/enums';




@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css']
})
export class ThemeEditComponent implements OnInit {
  theme = new ThemeModel;
  themeId: number;
  themeName: string;
  themeForm: FormGroup;
  state: State;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {  }

  ngOnInit() {
    this.themeId = +this.route.snapshot.params['id'];
    try {
      this.themeName = this.route.snapshot.queryParams['name'];
    } catch (e) {  }

    this.state = this.themeId === 0 ? State.add : State.edit;
    this.themeForm = new FormGroup({
      name: new FormControl(this.themeName)
    });
  }


  save() {
    if (this.state === State.add) {
      this.theme.id = undefined;
      this.dataService
        .saveTheme( Object.assign( this.theme, this.themeForm.value ) )
        .subscribe(
          (theme) => theme,
          error1 => console.log(error1)
        );
    } else if (this.state === State.edit) {
      this.theme.id = this.themeId;
      this.dataService
        .saveTheme( Object.assign( this.theme, this.themeForm.value ) )
        .subscribe(
          theme => theme,
          error1 => console.log(error1)
        );
    } else {
      throw new Error('themeForm state is undefined');
    }
  }


}
