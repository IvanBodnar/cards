import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';

import { CardComponent } from './card.component';
import {CardModel} from '../../models/card.model';
import {CardService} from '../../services/card.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataService} from '../../services/data.service';


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockCardService;
  let mockDataService;
  const CARD: CardModel = {
    id: 1,
    front: 'front',
    back: 'back',
    themeId: 1
  };

  const CARDS: CardModel[] = [CARD];

  beforeEach(async(() => {
    mockCardService = jasmine.createSpyObj(['getCard']);
    mockDataService = jasmine.createSpyObj(['getCards']);
    mockCardService.getCard.and.returnValue(CARD);
    mockDataService.getCards.and.returnValue(of(CARDS));


    TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      providers: [
        { provide: CardService, useValue: mockCardService },
        { provide: DataService, useValue: mockDataService }
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{path: 'card/:id', component: CardComponent}]
        )
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate cardsArray when created', () => {
    expect(component.cardsArray).toEqual(CARDS);
  });

  it('should change side when flip button is clicked', () => {
    const buttonDebugEl = fixture.debugElement.queryAll(By.css('button'))[0];
    buttonDebugEl.triggerEventHandler('click', null);
    expect(component.frontSide).toBe(false);
    fixture.detectChanges();
    expect(buttonDebugEl.nativeElement.innerText).toEqual('Ver Frente');

    // Card body
    component.card = CARD; // Hack porque tarda en renderizar por el ngIf
    fixture.detectChanges();
    const pDebugEl = fixture.debugElement.query(By.css('p'));
    console.log(pDebugEl);
    expect(pDebugEl.nativeElement.innerText).toEqual('back');


  });

  it('should flip side and call getCard() when next icon is clicked', () => {
    const debugEl = fixture.debugElement.query(By.css('a'));
    debugEl.triggerEventHandler('click', null);
    expect(component.frontSide).toBe(true);
    expect(mockCardService.getCard).toHaveBeenCalledTimes(2);

    // Card body
    fixture.detectChanges();
    const pDebugEl = fixture.debugElement.query(By.css('p'));
    console.log(pDebugEl);
    expect(pDebugEl.nativeElement.innerText).toEqual('front');
  });
});
