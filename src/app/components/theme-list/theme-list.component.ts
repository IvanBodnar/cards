import { Component, OnInit } from '@angular/core';

import {DataService} from '../../services/data.service';
import {ThemeModel} from '../../models/theme.model';


@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit {
  themesArray: ThemeModel[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getThemes()
      .subscribe(
        (themes: ThemeModel[]) => this.themesArray = themes
      );
  }

  onDelete(theme: ThemeModel): void {
    this.dataService.deleteTheme(theme)
      .subscribe(
        (_theme: ThemeModel) => _theme,
        null,
        () => this.dataService.getThemes()
          .subscribe(
            (themes: ThemeModel[]) => this.themesArray = themes
          )
      );
  }

}
