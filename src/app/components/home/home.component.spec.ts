import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {routes} from '../../routes';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ThemeListComponent} from '../theme-list/theme-list.component';
import {CardComponent} from '../card-list/card/card.component';

describe('HomeComponent', () => {
  let location: Location;
  let router: Router;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, ThemeListComponent, CardComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes)
      ]
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

  // Routing
  it('should navigate to /themes when themes button is clicked', fakeAsync( () => {
    fixture.debugElement.queryAll(By.css('button'))[0].triggerEventHandler('click', null);
    tick();
    expect(location.path()).toBe('/themes');
  }));
});
