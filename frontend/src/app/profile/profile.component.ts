import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from '@angular/material/card';

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
export class ProfileComponent {
  userInfoForm: FormGroup;
  isEditing = false;

  constructor(builder: FormBuilder) {
    this.userInfoForm = builder.group({})
  }

  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'A passionate developer and tech enthusiast.',
    avatarUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
  };

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
