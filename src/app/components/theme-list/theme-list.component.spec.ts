import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DebugElement, Provider} from '@angular/core';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

import {DataService} from '../../services/data.service';
import { ThemeListComponent } from './theme-list.component';
import {ThemeModel} from '../../models/theme.model';
import {CardModel} from '../../models/card.model';

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
  const CARDS: CardModel[] = [
    {
      id: 1,
      front: 'front',
      back: 'back',
      theme: 1
    } as CardModel
  ];

  beforeEach(async(() => {
    mockDataService = jasmine.createSpyObj(['getThemes', 'deleteTheme', 'getCards']);
    mockDataService.getThemes.and.returnValue(of(THEMES));
    mockDataService.deleteTheme.and.returnValue(of(THEMES[0] as ThemeModel));
    mockDataService.getCards.and.returnValue(of(CARDS));

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
    setTimeout(() => {
      expect(component.themesArray[0]).toEqual({id: 1, name: 'name'} as ThemeModel);
    }, 200);

  });

  it('should create 1 item on html', () => {
    setTimeout(() => {
      const themeItem: DebugElement[] = fixture.debugElement.queryAll(By.css('.item'));
      expect(themeItem.length).toEqual(1);
    }, 200);
  });

  // Problema con atributo cards de ThemeModel

  it('should have a label indicating 1 card', () => {
    setTimeout(() => {
      const labelEl: HTMLDivElement = fixture.debugElement.query(By.css('.label')).nativeElement;
      expect(labelEl.innerText).toEqual('1');
    }, 200);
  });

  it('should call onDelete -> dataService.deleteTheme 1 time -> dataService.getThemes 2 times when delete icon is clicked', () => {
    setTimeout(() => {
      const deleteIcon: DebugElement = fixture.debugElement.query(By.css('#a-delete'));
      deleteIcon.triggerEventHandler('click', null);

      expect(mockDataService.deleteTheme).toHaveBeenCalledTimes(1);
      expect(mockDataService.getThemes).toHaveBeenCalledTimes(2);
    }, 200);
  });
});
