import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

import {State, ThemeEditComponent} from './theme-edit.component';
import {DataService} from '../../../services/data.service';
import {ThemeModel} from '../../../models/theme.model';
import {SpyObject} from '@angular/core/testing/src/testing_internal';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';


describe('ThemeEditComponent', () => {
  let component: ThemeEditComponent;
  let fixture: ComponentFixture<ThemeEditComponent>;
  let mockDataService;
  let state: State;

  const THEME: ThemeModel = {
    id: 1,
    name: 'themeName'
  };

  beforeEach(async(() => {
    mockDataService = jasmine.createSpyObj(['saveTheme']);
    mockDataService.saveTheme.and.returnValue(of(THEME));

    TestBed.configureTestingModule({
      declarations: [ ThemeEditComponent ],
      imports: [ ReactiveFormsModule ],
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

  it('should have attribute "themeId" with value 0 after onInit', () => {
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
    console.log(component.themeForm.value);

    expect(mockDataService.saveTheme).toHaveBeenCalledTimes(1);

  })
});
