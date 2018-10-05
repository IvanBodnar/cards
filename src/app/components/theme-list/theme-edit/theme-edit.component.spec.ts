import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

import {ThemeEditComponent} from './theme-edit.component';
import {DataService} from '../../../services/data.service';
import {ThemeModel} from '../../../models/theme.model';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {State} from '../../../shared/enums';


// State add
describe('ThemeEditComponent - State.add', () => {
  let component: ThemeEditComponent;
  let fixture: ComponentFixture<ThemeEditComponent>;
  let mockDataService;

  const THEME: ThemeModel = {
    id: 1,
    name: 'themeName'
  };

  beforeEach(async(() => {
    mockDataService = jasmine.createSpyObj(['saveTheme']);
    mockDataService.saveTheme.and.returnValue(of(THEME));

    TestBed.configureTestingModule({
      declarations: [ ThemeEditComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {'id': 0} } } },
        { provide: DataService, useValue: mockDataService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have attribute "theme" with value 0 after onInit', () => {
    expect(component.themeId).toEqual(0);
  });

  it('should have state assigned to State.add', () => {
    expect(component.state).toEqual(State.add);
  });

  it('should call DataService.saveTheme() with correct values when save button is clicked', () => {
    const form = component.themeForm;
    const formDebugEl = fixture.debugElement.query(By.css('form'));

    form.get('name').setValue('test');
    formDebugEl.triggerEventHandler('ngSubmit', {});

    expect(mockDataService.saveTheme).toHaveBeenCalledTimes(1);
  });

  // html
  it('should have the form in invalid state the add theme button disabled when the form loads in State.add', () => {
    const form = component.themeForm;
    const themeEditBtnDebugEl = fixture.debugElement.query(By.css('#theme-edit-button'));
    expect(form.valid).toBeFalsy();
    expect(themeEditBtnDebugEl.nativeElement.classList).toContain('disabled');
  });

  it('should have form in valid state and theme button enabled when a value is entered in input', () => {
    const form = component.themeForm;
    const themeEditBtnDebugEl = fixture.debugElement.query(By.css('#theme-edit-button'));
    form.controls['name'].setValue('x');
    fixture.detectChanges();
    expect(form.valid).toBeTruthy();
    expect(themeEditBtnDebugEl.nativeElement.classList).not.toContain('disabled');
  });
});



// State edit
describe('ThemeEditComponent - State.edit', () => {
  let component: ThemeEditComponent;
  let fixture: ComponentFixture<ThemeEditComponent>;
  let mockDataService;

  const THEME: ThemeModel = {
    id: 1,
    name: 'themeName'
  };

  beforeEach(async(() => {
    mockDataService = jasmine.createSpyObj(['saveTheme']);
    mockDataService.saveTheme.and.returnValue(of(THEME));

    TestBed.configureTestingModule({
      declarations: [ ThemeEditComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {'id': 1},  queryParams: THEME } } },
        { provide: DataService, useValue: mockDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have attribute "theme" with value 1 after onInit', () => {
    expect(component.themeId).toEqual(1);
  });

  it('should have attribute "themeName" with value themeName after onInit', () => {
    expect(component.themeName).toEqual('themeName');
  });

  it('should have state assigned to State.edit', () => {
    expect(component.state).toEqual(State.edit);
  });

  it('should call DataService.saveTheme() with correct values when save button is clicked', () => {
    const form = component.themeForm;
    const formDebugEl = fixture.debugElement.query(By.css('form'));

    form.get('name').setValue('test');
    formDebugEl.triggerEventHandler('ngSubmit', {});

    expect(mockDataService.saveTheme).toHaveBeenCalledTimes(1);
  });

  // html
  it('should have the form in invalid state and the edit theme button disabled when the form loads', () => {
    const form = component.themeForm;
    const themeEditBtnDebugEl = fixture.debugElement.query(By.css('#theme-edit-button'));
    expect(form.valid).toBeFalsy();
    expect(themeEditBtnDebugEl.nativeElement.classList).toContain('disabled');
  });

  it('should have form in valid state and theme button enabled when a value different' +
    ' from the original is entered in input and come back to invalid and disabled when the input goes back to original', () => {
    const form = component.themeForm;
    const themeEditBtnDebugEl = fixture.debugElement.query(By.css('#theme-edit-button'));
    form.controls['name'].setValue('x');
    fixture.detectChanges();
    expect(form.valid).toBeTruthy();
    expect(themeEditBtnDebugEl.nativeElement.classList).not.toContain('disabled');

    form.controls['name'].setValue('themeName');
    fixture.detectChanges();
    expect(form.valid).toBeFalsy();
    expect(themeEditBtnDebugEl.nativeElement.classList).toContain('disabled');
  });
});
