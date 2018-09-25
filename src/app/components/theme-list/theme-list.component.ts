import { Component, OnInit } from '@angular/core';
import {tap} from 'rxjs/operators';

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
      .pipe(
        tap(
          themes => {
            themes.map(
              theme => {
                this._getNumberOfCards(theme);
              }
            );
          })
      )
      .subscribe(
        (themes: ThemeModel[]) => this.themesArray = themes
      );
  }

  onDelete(_theme: ThemeModel): void {
    this.dataService.deleteTheme(_theme)
      .subscribe(
        (theme: ThemeModel) => theme,
        null,
        () => this.dataService.getThemes()
          .pipe(
            tap(
              themes => {
                themes.map(
                  theme => {
                    this._getNumberOfCards(theme);
                  }
                );
              })
          )
          .subscribe(
            (themes: ThemeModel[]) => this.themesArray = themes
          )
      );
  }

  _getNumberOfCards(theme: ThemeModel): void {
    this.dataService.getCards(theme.id).subscribe(cards => theme.cards = cards.length);
  }

}
