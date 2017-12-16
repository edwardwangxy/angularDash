import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDetactionComponent } from './login-detaction.component';

describe('LoginDetactionComponent', () => {
  let component: LoginDetactionComponent;
  let fixture: ComponentFixture<LoginDetactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDetactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDetactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
