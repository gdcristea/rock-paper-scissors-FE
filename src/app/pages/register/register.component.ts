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
   * Register user
   */
  onSubmit(): void {
    //here I will add the logic to connect it with the backend
  }
}

/**
 * todo:
 * - placeholders for inputs
 * - error handling: I will show the user a general technical error page if they
 * send the data to the BE and the BE is down
 * - show inline error when the user already exists in the database. implement logic
 * in error handling and also here where I will use isUsernameTaken to store that information
 * - 100% percent unit tests
 * - better design
 */
