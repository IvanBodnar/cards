import {Component, OnInit} from '@angular/core';

import {DataService} from '../../services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  themesCount: number;
  pluralMapping = {
    '=1': 'tema disponible',
    'other': 'temas disponibles'
  };

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getThemes()
      .subscribe(
        themes => this.themesCount = themes.length
      );
  }

}
