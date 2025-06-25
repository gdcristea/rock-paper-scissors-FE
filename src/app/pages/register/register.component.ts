import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  onSubmit(): void {
    //here I will add the logic to connect it with the backend
  }
}
