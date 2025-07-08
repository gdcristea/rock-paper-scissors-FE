import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppRoutes } from '../../core/constants/app-routes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../../services/api-service/api.service';
import {of, throwError} from 'rxjs';

const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
const mockSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open']);
mockSnackBarService.open.and.returnValue({
  afterDismissed: () => of({dismissedByAction: false})
})
const mockApiService = jasmine.createSpyObj('ApiService', ['signup']);

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  /**
   * Helper function to make the form valid and reduce code duplication
   */
  const makeFormValid = (): void => {
    component.registerForm.get('username').setValue('validUser');
    component.registerForm.get('password').setValue('password1');
    component.registerForm.get('confirmPassword').setValue('password1');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: ApiService, useValue: mockApiService },
      ],
    }).compileComponents();
    mockApiService.signup.calls.reset();
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('username', () => {
    it('should return the right error message when the username control\'s error is "required"', () => {
      component.registerForm.get('username').setValue('');
      expect(component.getUsernameError()).toEqual('Username is required');
    });

    it('should return the right error message when the username control\'s error is "pattern"', () => {
      component.registerForm.get('username').setValue('?123');
      expect(component.getUsernameError()).toEqual(
        'Username can only contain letters, numbers, and underscores (_), without spaces or special characters.'
      );
    });

    it('should return the right error message when the username control\'s error is "minlength"', () => {
      component.registerForm.get('username').setValue('123');
      expect(component.getUsernameError()).toEqual(
        'Username length should be at least 4'
      );
    });

    it('should return the right error message when the username already exists in the database', () => {
      component.registerForm.get('username').setValue('correctUsername');
      component.isUsernameTaken = true;
      expect(component.getUsernameError()).toEqual('Username already exists');
    });

    it('should return null if the username is correct', () => {
      component.registerForm.get('username').setValue('correctUsername');
      expect(component.getUsernameError()).toEqual(null);
    });
  });

  describe('password', () => {
    it('should return the right error message when the password control\'s is "required"', () => {
      component.registerForm.get('password').setValue('');
      expect(component.getPasswordError()).toEqual('Password is required');
    });

    it('should return the right error message when the password control\'s error is "minlength"', () => {
      component.registerForm.get('password').setValue('abcd');
      expect(component.getPasswordError()).toEqual(
        'Password length should be at least 6'
      );
    });

    it('should return null if the password is correct', () => {
      component.registerForm.get('password').setValue('abcd32131');
      expect(component.getPasswordError()).toEqual(null);
    });
  });

  it('should return an error message if the passwords are not the same', () => {
    component.registerForm.get('password').setValue('password1');
    component.registerForm.get('confirmPassword').setValue('differentPassword');
    expect(component.registerForm.hasError('passwordsMismatch')).toEqual(true);
  });

  it('should not return an error message if the passwords are the same', () => {
    component.registerForm.get('password').setValue('password1');
    component.registerForm.get('confirmPassword').setValue('password1');
    expect(component.registerForm.hasError('passwordsMismatch')).toEqual(false);
  });

  it('onLogin should navigate to login page', () => {
    component.onLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith([AppRoutes.login]);
  });

  it('openSnackBar should open the snack bar and then redirect the user to the login page', () => {
    component.openSnackBar();
    expect(mockRouter.navigate).toHaveBeenCalledWith([AppRoutes.login]);
  });

  it('onRegister should not call api service signup if the registerForm is invalid', () => {
    component.registerForm.get('username').setValue('???'); //wrong username => the form is invalid;

    component.onRegister();

    expect(mockApiService.signup).not.toHaveBeenCalled();
  });

  it('onRegister should call api service sign up if the registerForm is valid', fakeAsync(() => {
    //returns success response
    mockApiService.signup.and.returnValue(
      of({ response: { message: 'User registered successfully' } })
    );
    makeFormValid();

    component.onRegister();
    tick();

    expect(mockApiService.signup).toHaveBeenCalledWith({username: 'validUser', password: 'password1'});
    expect(mockSnackBarService.open).toHaveBeenCalled();
  }));

  it('onRegister should not call api service signup if the registerForm is invalid', () => {
    component.registerForm.get('username').setValue('???'); //wrong username => the form is invalid;

    component.onRegister();

    expect(mockApiService.signup).not.toHaveBeenCalled();
  });

  it('if onRegister returns an error, and the username is already taken then set isUsernameTaken property to true in order to show an inline error', fakeAsync(()=> {
    mockApiService.signup.and.returnValue(
      throwError({error: {errorCode: 'USERNAME_TAKEN', errorMessage: 'The username is already taken'}}));
    makeFormValid();

    component.onRegister();
    tick();

    expect(component.isUsernameTaken).toEqual(true);
  }));

  it('if onRegister returns a general error, then navigate the user to the error page', fakeAsync(()=> {
    mockApiService.signup.and.returnValue(
      throwError({error: {errorCode: 'SERVER_ERROR', errorMessage: 'The server is down'}}));
    makeFormValid();

    component.onRegister();
    tick();

    expect(mockRouter.navigate).toHaveBeenCalledWith([AppRoutes.technicalError]);
  }));
});
