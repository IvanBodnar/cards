import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  getCard(cardId: number): Observable<CardModel> {
    return this.http.get<CardModel>(this.url + '/cards/' + cardId);
  }

  getCards(themeId: number) {
    return this.http.get<CardModel[]>(this.url + '/cards?themeId=' + themeId);
  }

  saveTheme(theme: ThemeModel): Observable<ThemeModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (theme.id === undefined) {
      return this.createTheme(theme, headers);
    } else {
      return this.editTheme(theme, headers);
    }
  }

  createTheme(theme: ThemeModel, headers: HttpHeaders): Observable<ThemeModel> {
    return this.http.post<ThemeModel>(this.url + '/themes', theme, {headers: headers});
  }

  editTheme(theme: ThemeModel, headers: HttpHeaders): Observable<ThemeModel> {
    return this.http.put<ThemeModel>(this.url + '/themes/' + theme.id, theme, {headers: headers});
  }
}
