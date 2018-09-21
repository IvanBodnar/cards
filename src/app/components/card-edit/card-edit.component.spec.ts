import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import { CardEditComponent } from './card-edit.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CardModel} from '../../models/card.model';
import {State} from '../../shared/enums';
import {By} from '@angular/platform-browser';



describe('CardEditComponent', () => {
  let component: CardEditComponent;
  let fixture: ComponentFixture<CardEditComponent>;
  const card: CardModel =  {
    id: 1,
    front: 'front',
    back: 'back',
    themeId: 1
  };
  const route = {
      snapshot: {
        data: {card: card}
      }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEditComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: route }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have state State.edit', () => {
    expect(component.state).toEqual(State.edit);
  });

  it('should have correct front and back values', () => {
    expect(component.card.front).toEqual('front');
    expect(component.card.back).toEqual('back');
  });

  it('should create the FormGroup', () => {
    expect(component.cardForm).toBeTruthy();
  });

  // html
  it('should have textareas with expected default values', () => {
    const textAreaEls = fixture.debugElement.queryAll(By.css('textarea'));
    expect(textAreaEls[0].nativeElement.value).toEqual('front');
    expect(textAreaEls[1].nativeElement.value).toEqual('back');
  });

  it('should have the correct text for State.edit in the button', () => {
    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.innerText).toEqual('Guardar Cambios');
  });
});
