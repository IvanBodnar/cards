import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';

import { CardResolverService } from './card-resolver.service';
import {CardModel} from '../models/card.model';
import {DataService} from './data.service';

describe('CardResolverService', () => {
  let resolverService: CardResolverService;
  let dataService: DataService;
  let httpTestingController: HttpTestingController;
  const CARD: CardModel = {
      id: 1,
      front: 'front',
      back: 'back',
      themeId: 1
    };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardResolverService,
        DataService
      ],
      imports: [HttpClientTestingModule]
    });

    resolverService = TestBed.get(CardResolverService);
    dataService = TestBed.get(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(resolverService).toBeTruthy();
  });

  it('should GET one card', () => {
    dataService.getCard(1)
      .subscribe(
        (data: CardModel) => {
          expect(data).toEqual(CARD);
        }
      );
    const req: TestRequest = httpTestingController.expectOne('http://localhost:3000/cards/1');
    expect(req.request.method).toEqual('GET');
    req.flush(CARD);
  });
});
