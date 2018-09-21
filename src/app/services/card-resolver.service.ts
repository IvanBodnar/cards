import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CardModel} from '../models/card.model';
import {Observable} from 'rxjs';
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
  ): Observable<CardModel> | Promise<CardModel> | CardModel {
    const cardId = +route.params['id'];
    return this.dataService.getCard(cardId);
  }
}
