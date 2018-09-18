import {TestBed, inject, async} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';

import { DataService } from './data.service';
import {CardModel} from '../models/card.model';
import {ThemeModel} from '../models/theme.model';
import {HttpHeaders} from '@angular/common/http';


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

  describe('saveTheme', () => {
    it('should return a ThemeModel object when a POST is made', () => {
      const data: ThemeModel = {id: undefined, name: 'test'};
      service.saveTheme(data).subscribe(theme => {
        expect(theme).toEqual({id: 1, name: 'test'} as ThemeModel);
      });

      const req: TestRequest = httpTestingController.expectOne('http://localhost:3000/themes');
      expect(req.request.method).toBe('POST');

      req.flush({id: 1, name: 'test'} as ThemeModel);
    });

    it('should return a ThemeModel object when a PUT is made', () => {
      const data: ThemeModel = {id: 1, name: 'test'};
      service.saveTheme(data).subscribe(theme => {
        expect(theme).toEqual({id: 1, name: 'test'} as ThemeModel);
      });

      const req: TestRequest = httpTestingController.expectOne('http://localhost:3000/themes/1');
      expect(req.request.method).toBe('PUT');

      req.flush({id: 1, name: 'test'} as ThemeModel);
    });
  });
});
