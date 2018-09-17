import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ThemeModel} from '../models/theme.model';
import {CardModel} from '../models/card.model';
import {Observable} from 'rxjs';
import {Headers, RequestOptions} from '@angular/http';

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

  saveTheme(theme: ThemeModel): Observable<ThemeModel> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    if (theme.id === 0) {
      return this.createTheme(theme, options);
    }
  }

  createTheme(theme: ThemeModel, options: RequestOptions): Observable<ThemeModel> {
    return this.http.post<ThemeModel>(this.url + 'themes', options);
  }
}
