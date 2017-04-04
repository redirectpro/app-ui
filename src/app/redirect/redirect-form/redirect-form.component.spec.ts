import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectFormComponent } from './redirect-form.component';

describe('RedirectFormComponent', () => {
  let component: RedirectFormComponent;
  let fixture: ComponentFixture<RedirectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
