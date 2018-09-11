import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { DataService } from './data.service';

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

  describe('getThemes', () => {

    it('should get an array with one theme object', () => {
      service.getThemes().subscribe();

      const req = httpTestingController.expectOne('http://localhost:3000/themes');
      req.flush([{id: 1, name: 'theme1'}]);
    });
  });

  it('should be created', inject([DataService], (serv: DataService) => {
    expect(serv).toBeTruthy();
  }));
});
