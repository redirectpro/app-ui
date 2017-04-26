import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectFromToComponent } from './redirect-from-to.component';

describe('RedirectFromToComponent', () => {
  let component: RedirectFromToComponent;
  let fixture: ComponentFixture<RedirectFromToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectFromToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectFromToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
