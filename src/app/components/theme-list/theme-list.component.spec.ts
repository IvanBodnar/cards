import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { ThemeListComponent } from './theme-list.component';
import {DataService} from '../../services/data.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DebugElement, Provider} from '@angular/core';
import {ThemeModel} from '../../models/theme.model';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

describe('ThemeListComponent', () => {
  let component: ThemeListComponent;
  let fixture: ComponentFixture<ThemeListComponent>;
  let mockDataService;
  const THEMES: ThemeModel[] = [
    {
      id: 1,
      name: 'name'
    } as ThemeModel
  ];

  beforeEach(async(() => {
    mockDataService = jasmine.createSpyObj(['getThemes', 'deleteTheme']);
    mockDataService.getThemes.and.returnValue(of(THEMES));
    mockDataService.deleteTheme.and.returnValue(of(THEMES[0] as ThemeModel));

    TestBed.configureTestingModule({
      declarations: [ ThemeListComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        <Provider>{ provide: DataService, useValue: mockDataService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dataService.getThemes 1 time when created', () => {
    expect(mockDataService.getThemes).toHaveBeenCalledTimes(1);
  });

  it('should populate attribute themesArray when is created', () => {
    expect(component.themesArray[0]).toEqual({id: 1, name: 'name'});
  });

  it('should create 1 item on html', () => {
    const themeItem: DebugElement[] = fixture.debugElement.queryAll(By.css('.item'));
    expect(themeItem.length).toEqual(1);
  });

  it('should call onDelete -> dataService.deleteTheme 1 time -> dataService.getThemes 2 times when delete icon is clicked', () => {
    const deleteIcon: DebugElement = fixture.debugElement.query(By.css('#a-delete'));
    deleteIcon.triggerEventHandler('click', THEMES[0]);

    expect(mockDataService.deleteTheme).toHaveBeenCalledTimes(1);
    expect(mockDataService.getThemes).toHaveBeenCalledTimes(2);
  });
});
