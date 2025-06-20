import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('username', () => {
    it('should return the right error message when the username control\'s error is "required"', () => {
      const usernameControl = component.registerForm.get('username');
      usernameControl.setValue('');
      expect(component.getUsernameError()).toEqual('Username is required');
    });

    it('should return the right error message when the username control\'s error is "pattern"', () => {
      const usernameControl = component.registerForm.get('username');
      usernameControl.setValue('?123');
      expect(component.getUsernameError()).toEqual(
        'Username can only contain letters, numbers, and underscores (_), without spaces or special characters.'
      );
    });

    it('should return the right error message when the username control\'s error is "minlength"', () => {
      const usernameControl = component.registerForm.get('username');
      usernameControl.setValue('123');
      expect(component.getUsernameError()).toEqual(
        'Username length should be at least 4'
      );
    });

    it('should return the right error message when the username already exists in the database', () => {
      const usernameControl = component.registerForm.get('username');
      usernameControl.setValue('correctUsername');
      component.isUsernameTaken = true;
      expect(component.getUsernameError()).toEqual('Username already exists');
    });

    it('should return null if the username is correct', () => {
      const usernameControl = component.registerForm.get('username');
      usernameControl.setValue('correctUsername');
      expect(component.getUsernameError()).toEqual(null);
    });
  });
});
