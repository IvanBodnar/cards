import { Component, OnInit } from '@angular/core';
import {ThemeModel} from '../../models/theme.model';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit {
  themesArray: ThemeModel[];

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.themeService.getThemes()
      .subscribe(
        (themes: ThemeModel[]) => this.themesArray = themes
      );
  }

}
