import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCartdComponent } from './credit-cartd.component';

describe('CreditCartdComponent', () => {
  let component: CreditCartdComponent;
  let fixture: ComponentFixture<CreditCartdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCartdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCartdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
