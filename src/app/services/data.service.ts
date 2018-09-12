import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ThemeModel} from '../models/theme.model';
import {CardModel} from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getThemes() {
    return this.http.get<ThemeModel[]>(this.url + '/themes');
  }

  getCards() {
    return this.http.get<CardModel[]>(this.url + '/cards');
  }
}
