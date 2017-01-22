/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthIdSiteResultComponent } from './auth-id-site-result.component';

describe('AuthIdSiteResultComponent', () => {
  let component: AuthIdSiteResultComponent;
  let fixture: ComponentFixture<AuthIdSiteResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthIdSiteResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthIdSiteResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
