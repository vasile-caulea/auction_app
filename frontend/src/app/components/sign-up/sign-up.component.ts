import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatHint
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  signUpForm: FormGroup;

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 150, 0, 1);
  readonly maxDate = new Date(this._currentYear - 18, 0, 1);

  constructor(fd: FormBuilder, private authService: AuthService) {
    this.signUpForm = fd.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthDate: ['', Validators.required],
    });
  }

  signUp() {
    console.log(this.signUpForm.value)
    this.authService.signup(this.signUpForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
