import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';
import {By} from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a not initialized property "active"', () => {
    expect(component.active).toEqual(undefined);
  });

  it('should change property "active" to true when mouseenter a tag', () => {
    const aElement = fixture.debugElement.query(By.css('a'));
    aElement.triggerEventHandler('mouseenter', {});

    expect(component.active).toEqual(true);
  });

  it('should change property "active" to false when mouseleave a tag', () => {
    const aElement = fixture.debugElement.query(By.css('a'));
    aElement.triggerEventHandler('mouseleave', {});

    expect(component.active).toEqual(false);
  });

});
