import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDoorComponent } from './login-door.component';

describe('LoginDoorComponent', () => {
  let component: LoginDoorComponent;
  let fixture: ComponentFixture<LoginDoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginDoorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
