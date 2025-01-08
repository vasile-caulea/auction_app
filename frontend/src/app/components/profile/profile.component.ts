import {Component, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from '@angular/material/card';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  createdAt: Date;
  avatarUrl: string;
  _id: string;
}

@Component({
  selector: 'app-profile',
  imports: [
    MatButton,
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel,
    MatCard,
    MatCardContent,
    NgOptimizedImage,
    MatCardActions,
    MatCardImage,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfoForm: FormGroup;
  isEditing = false;

  user: User = {} as User;
  currentUser: User = {} as User;

  constructor(builder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute) {
    this.userInfoForm = builder.group({})
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userid');

    if (userId) {
      this.userService.getUserById(userId).subscribe((data) => {
        this.user = data;
        console.log(data._id);
        data.birthDate = new Date(data.birthDate);
        data.createdAt = new Date(data.createdAt);
      });
    }

    this.userService.getUserInfo().subscribe({
      next: (data) => {
        if (!userId) {
          this.user = data;
          data.birthDate = new Date(data.birthDate);
          data.createdAt = new Date(data.createdAt);
        }
        console.log(data);
        this.currentUser = data;

      },
      error: (err) => {
        if (err.status === 401) {
          this.authService.logout();
        }
        console.log(err);
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  logout() {
    this.authService.logout();
  }

  getFormattedDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  canEditProfile(): boolean {
    return this.currentUser && this.user && this.currentUser._id === this.user._id;
  }
}
