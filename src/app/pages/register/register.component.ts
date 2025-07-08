import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api-service/api.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../core/constants/app-routes';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {IResponseError, ISignUpPayload} from '../../services/api-service/api.interfaces';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  /**
   * Stores signup information.
   */
  registerForm: FormGroup;

  /**
   * Stores if the username already exists in the database.
   */
  isUsernameTaken = false;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.pattern(/^\w+$/), //a-z, A-Z, 0-9, _
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator() }
    );

    /**
     * Sets isUsernameTaken to false
     * If the isUsernameTaken is taken based on the answer from the BE, then isUsernameTaken = true
     * Afterward, when the user changes the value of the username then isUsernameTaken = false
     */
    this.registerForm.get('username').valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.isUsernameTaken = false);
  }

  /**
   * Checks if the two passwords are the same.
   */
  private passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const password = form.get('password').value;
      const confirmPassword = form.get('confirmPassword').value;
      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }

  /**
   * Returns a specific error message if the username input is invalid.
   */
  getUsernameError(): string | null {
    const usernameControl = this.registerForm.get('username');

    if (usernameControl.hasError('required')) {
      return 'Username is required';
    } else if (usernameControl.hasError('pattern')) {
      return 'Username can only contain letters, numbers, and underscores (_), without spaces or special characters.';
    } else if (usernameControl.hasError('minlength')) {
      return 'Username length should be at least 4';
    } else if (this.isUsernameTaken) {
      return 'Username already exists';
    }

    return null;
  }

  /**
   * Returns a specific error message if the password is invalid.
   */
  getPasswordError(): string | null {
    const passwordControl = this.registerForm.get('password');

    if (passwordControl.hasError('required')) {
      return 'Password is required';
    } else if (passwordControl.hasError('minlength')) {
      return 'Password length should be at least 6';
    }

    return null;
  }

  /**
   * Register user
   */
  onRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;

    //Create sign up data to be sent to the backend
    const signUpData: ISignUpPayload = {
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value
    }
    this.apiService.signup(signUpData)
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.openSnackBar();
      },
      error: (error: IResponseError) => {
        this.isLoading = false;

        if(error.error.errorCode === 'USERNAME_TAKEN') {
          this.isUsernameTaken = true;
          return;
        }

        /**
         * If there is a server error, then navigate to the general error page.
         */
        this.router.navigate([AppRoutes.technicalError]);
      },
    });
  }

  /**
   * Navigate to login page if the user already has an account
   */
  onLogin(): void {
    this.router.navigate([AppRoutes.login]);
  }

  /**
   * Opens success snack bar
   * When the snackbar disappears then navigate to login page
   */
  openSnackBar(): void {
    const snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this.snackBarService.open(
      "🎉 Welcome! Your account is ready. Let's log you in.",
      '',
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'snackBar--green'
      }
    );

    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate([AppRoutes.login]);
    })
  }
}
