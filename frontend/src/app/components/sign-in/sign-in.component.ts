import {ChangeDetectionStrategy, Component, signal} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {AuthService} from '../../services/auth.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInput
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SignInComponent {
  loginForm: FormGroup;
  hide = signal(true);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
