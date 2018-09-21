import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CardModel} from '../models/card.model';
import {Observable, of} from 'rxjs';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CardResolverService implements Resolve<CardModel> {

  constructor(
    private dataService: DataService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CardModel> {
    const cardId = +route.params['id'];
    if (cardId === 0) {
      return of(new CardModel());
    }
    return this.dataService.getCard(cardId);
  }
}
