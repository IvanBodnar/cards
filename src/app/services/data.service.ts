import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import { environment } from '../../environments/environment';
import {ThemeModel} from '../models/theme.model';
import {CardModel} from '../models/card.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = environment.apiUrl + '/api/';

  constructor(
    private http: HttpClient
  ) { }

  getThemes(): Observable<ThemeModel[]> {
    return this.http.get<ThemeModel[]>(this.url + 'themes');
  }

  getCard(cardId: number): Observable<CardModel> {
    return this.http.get<CardModel>(this.url + 'cards/' + cardId);
  }

  getCards(themeId: number) {
    return this.http.get<CardModel[]>(this.url + 'cards/?theme=' + themeId);
  }

  saveCard(card: CardModel): Observable<CardModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (card.id === undefined) {
      return this.createCard(card, headers);
    } else {
      return this.editCard(card, headers);
    }
  }

  createCard(card: CardModel, headers: HttpHeaders): Observable<CardModel> {
    return this.http.post<CardModel>(this.url + '/cards/0/edit', card, {headers: headers});
  }

  editCard(card: CardModel, headers: HttpHeaders): Observable<CardModel> {
    return this.http.put<CardModel>(this.url + '/cards/' + card.id, card, {headers: headers});
  }

  deleteCard(card: CardModel): Observable<CardModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<CardModel>(this.url + '/cards/' + card.id, {headers: headers});
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
    return this.http.post<ThemeModel>(this.url + 'themes/0/edit', theme, {headers: headers});
  }

  editTheme(theme: ThemeModel, headers: HttpHeaders): Observable<ThemeModel> {
    return this.http.put<ThemeModel>(this.url + 'themes/' + theme.id, theme, {headers: headers});
  }

  deleteTheme(theme: ThemeModel): Observable<ThemeModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<ThemeModel>(this.url + 'themes/' + theme.id, {headers: headers});
  }
}
