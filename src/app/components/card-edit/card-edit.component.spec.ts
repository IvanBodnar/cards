import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { CardEditComponent } from './card-edit.component';
import {CardModel} from '../../models/card.model';
import {State} from '../../shared/enums';


// Edit state
describe('CardEditComponent - State.edit', () => {
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
    const buttonEl: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.innerText).toEqual('Guardar Cambios');
  });

  it('should have button disabled', () => {
    const buttonEl: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.classList).toContain('disabled');
  });

  it('should activate button when value on front or back textarea is different from original', () => {
    const form: FormGroup = component.cardForm;
    const buttonEl: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;

    form.controls['front'].setValue('test');
    fixture.detectChanges();
    expect(buttonEl.classList).not.toContain('disabled');

    form.controls['front'].setValue('front');
    fixture.detectChanges();

    form.controls['back'].setValue('test');
    fixture.detectChanges();
    expect(buttonEl.classList).not.toContain('disabled');
  });

  it('should disable button when back and front go back to original value', () => {
    const form: FormGroup = component.cardForm;
    const buttonEl: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;

    form.controls['front'].setValue('test');
    fixture.detectChanges();
    expect(buttonEl.classList).not.toContain('disabled');

    form.controls['front'].setValue('front');
    fixture.detectChanges();
    expect(buttonEl.classList).toContain('disabled');

    form.controls['back'].setValue('test');
    fixture.detectChanges();
    expect(buttonEl.classList).not.toContain('disabled');

    form.controls['back'].setValue('back');
    fixture.detectChanges();
    expect(buttonEl.classList).toContain('disabled');
  });
});



// Add state
describe('CardEditComponent - State.add', () => {
  let component: CardEditComponent;
  let fixture: ComponentFixture<CardEditComponent>;
  const card: CardModel =  new CardModel();
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
    expect(component.state).toEqual(State.add);
  });

  it('should have correct front and back values', () => {
    expect(component.card.front).toEqual(undefined);
    expect(component.card.back).toEqual(undefined);
  });

  it('should create the FormGroup', () => {
    expect(component.cardForm).toBeTruthy();
  });

  // html
  it('should have textareas with expected default values', () => {
    const textAreaEls = fixture.debugElement.queryAll(By.css('textarea'));
    expect(textAreaEls[0].nativeElement.value).toEqual('');
    expect(textAreaEls[1].nativeElement.value).toEqual('');
  });

  it('should have the correct text for State.edit in the button', () => {
    const buttonEl: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.innerText).toEqual('Guardar Tarjeta');
  });

  it('should have button disabled', () => {
    const buttonEl: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.classList).toContain('disabled');
  });

  it('should activate button when value on front and back textarea is not empty', () => {
    const form: FormGroup = component.cardForm;
    const buttonEl: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;

    form.controls['front'].setValue('test');
    form.controls['back'].setValue('test');
    fixture.detectChanges();
    expect(buttonEl.classList).not.toContain('disabled');
  });

  it('should disable button when back or front go back to empty', () => {
    const form: FormGroup = component.cardForm;
    const buttonEl: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;

    form.controls['front'].setValue('test');
    form.controls['back'].setValue('test');
    fixture.detectChanges();
    expect(buttonEl.classList).not.toContain('disabled');

    form.controls['front'].setValue('');
    fixture.detectChanges();
    expect(buttonEl.classList).toContain('disabled');

    form.controls['front'].setValue('test');
    fixture.detectChanges();

    form.controls['back'].setValue('');
    fixture.detectChanges();
    expect(buttonEl.classList).toContain('disabled');
  });
});
