import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { DataService } from './data.service';
import {CardModel} from '../models/card.model';


describe('DataService', () => {
  let httpTestingController: HttpTestingController;
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DataService);
  });

  describe('DataService created', () => {
    it('should be created', inject([DataService], (serv: DataService) => {
      expect(serv).toBeTruthy();
    }));
  });

  describe('getThemes', () => {

    it('should get an array with one theme object', () => {
      service.getThemes().subscribe(data => {
        expect(data[0]).toEqual({id: 1, name: 'theme1'});
      });

      const req = httpTestingController.expectOne('http://localhost:3000/themes');
      expect(req.request.method).toBe('GET');
      req.flush([{id: 1, name: 'theme1'}]);
    });
  });

  describe('getCards', () => {
    it('should get an array with one card object', () => {
      service.getCards().subscribe(data => {
        expect(data[0]).toEqual({
          id: 1,
          front: 'front',
          back: 'back',
          themeId: 1
        } as CardModel);
      });

      const req = httpTestingController.expectOne('http://localhost:3000/cards');
      expect(req.request.method).toBe('GET');
      req.flush([
        {
          id: 1,
          front: 'front',
          back: 'back',
          themeId: 1
        }
      ] as CardModel[]);
    });
  });
});
