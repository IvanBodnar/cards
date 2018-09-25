import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import SpyObj = jasmine.SpyObj;

import {RouterTestingModule} from '@angular/router/testing';
import { HomeComponent } from './home.component';
import {ThemeListComponent} from '../theme-list/theme-list.component';
import {DataService} from '../../services/data.service';
import {ThemeModel} from '../../models/theme.model';
import {of} from 'rxjs';
import {Provider} from '@angular/core';


describe('HomeComponent', () => {
  let location: Location;
  let router: Router;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockDataService: SpyObj<DataService>;
  const THEMES: ThemeModel[] = [
    {
      id: 1,
      name: 'name'
    } as ThemeModel
  ];

  beforeEach(async(() => {
    mockDataService = jasmine.createSpyObj(['getThemes']);
    mockDataService.getThemes.and.returnValue(of(THEMES));

    TestBed.configureTestingModule({
      declarations: [ HomeComponent, ThemeListComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'home', component: HomeComponent},
          {path: 'themes', component: ThemeListComponent}]
        )
      ],
      providers: [ { provide: DataService, useValue: mockDataService } as Provider ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an h1 tag with text "Bienvenido"', () => {
    const h1Element = fixture.debugElement.query(By.css('h1')).nativeElement;

    expect(h1Element.innerText).toEqual('Bienvenido');
  });

  it('should show the number of available themes on html', () => {
    const pNumberOfThemesEl: HTMLParagraphElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(pNumberOfThemesEl.innerText).toEqual('1 tema disponible');
  });

  // Routing
  it('should navigate to /themes when themes button is clicked', fakeAsync( () => {
    fixture.debugElement.queryAll(By.css('button'))[0].triggerEventHandler('click', null);
    tick();
    expect(location.path()).toBe('/themes');
  }));
});
