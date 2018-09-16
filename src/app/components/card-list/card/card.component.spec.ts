import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import { CardComponent } from './card.component';
import {CardModel} from '../../../models/card.model';
import {CardService} from '../../../services/card.service';


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockCardService;
  const CARD: CardModel = {
    id: 1,
    front: 'front',
    back: 'back',
    themeId: 1
  };

  beforeEach(async(() => {
    mockCardService = jasmine.createSpyObj(['getCard']);
    mockCardService.getCard.and.returnValue(CARD);

    TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      providers: [
        { provide: CardService, useValue: mockCardService }
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

  it('should populate "card" attribute when initialized', (done) => {
    setTimeout(() => {
      expect(component.card).toEqual(CARD);
      done();
    }, 100);
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
    expect(mockCardService.getCard).toHaveBeenCalledTimes(1);

    // Card body
    fixture.detectChanges();
    const pDebugEl = fixture.debugElement.query(By.css('p'));
    console.log(pDebugEl);
    expect(pDebugEl.nativeElement.innerText).toEqual('front');
  });
});
