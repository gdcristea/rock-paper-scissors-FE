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

  describe('password', () => {
    it('should return the right error message when the password control\'s is "required"', () => {
      const passwordControl = component.registerForm.get('password');
      passwordControl.setValue('');
      expect(component.getPasswordError()).toEqual('Password is required');
    });

    it('should return the right error message when the password control\'s error is "minlength"', () => {
      const passwordControl = component.registerForm.get('password');
      passwordControl.setValue('abcd');
      expect(component.getPasswordError()).toEqual('Password length should be at least 6');
    });

    it('should return null if the password is correct', () => {
      const passwordControl = component.registerForm.get('password');
      passwordControl.setValue('abcd32131');
      expect(component.getPasswordError()).toEqual(null);
    });
  });

  it('should return an error message if the passwords are not the same', () => {
    const passwordControl = component.registerForm.get('password');
    const confirmPasswordControl = component.registerForm.get('confirmPassword');
    passwordControl.setValue('parola1');
    confirmPasswordControl.setValue('parolaDiferita');
    expect(component.registerForm.hasError('passwordsMismatch')).toEqual(true);
  });

  it('should not return an error message if the passwords are the same', () => {
    const passwordControl = component.registerForm.get('password');
    const confirmPasswordControl = component.registerForm.get('confirmPassword');
    passwordControl.setValue('parola1');
    confirmPasswordControl.setValue('parola1');
    expect(component.registerForm.hasError('passwordsMismatch')).toEqual(false);
  });
});
