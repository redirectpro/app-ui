import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectListComponent } from './redirect-list.component';

describe('RedirectListComponent', () => {
  let component: RedirectListComponent;
  let fixture: ComponentFixture<RedirectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
