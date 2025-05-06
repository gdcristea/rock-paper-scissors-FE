import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ApiService} from '../../services/api-service/api.service';

/**
 * Standalone Angular component that handles user registration using reactive forms.
 * Includes validation for required fields, email format, minimum password length, and password confirmation.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  /**
   * Reactive form group holding the registration form controls.
   */
  registerForm: FormGroup;

  /**
   * Injected FormBuilder instance used to easily construct the form group.
   * @private
   */
  private fb = inject(FormBuilder);

  private apiService = inject(ApiService);
  /**
   * Lifecycle hook that initializes the form with validation rules.
   */
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        // Custom validator to ensure password and confirmPassword match
        validator: this.matchPasswords('password', 'confirmPassword'),
      }
    );
  }

  /**
   * Custom validator function to compare password and confirmPassword fields.
   * @param password - the name of the password control
   * @param confirmPassword - the name of the confirmPassword control
   * @returns a validator function to be used on the form group
   */
  private matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls[password];
      const confirm = formGroup.controls[confirmPassword];

      if (pass.value !== confirm.value) {
        confirm.setErrors({ mustMatch: true });
      } else {
        confirm.setErrors(null);
      }
    };
  }

  /**
   * Handles form submission.
   */
  onSubmit(): void {

    if (this.registerForm.invalid) {
      return;
    }

    const {username, password} = this.registerForm.controls;

    this.apiService.signup(username.value, password.value).subscribe();
  }
}
