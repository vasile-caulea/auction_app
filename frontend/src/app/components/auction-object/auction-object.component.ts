import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-auction-object',
  imports: [
    MatCard,
    MatCardContent,
    NgIf,
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatProgressBar,
    MatLabel,
    MatCardHeader
  ],
  templateUrl: './auction-object.component.html',
  styleUrl: './auction-object.component.css'
})
export class AuctionObjectComponent implements OnInit {
  @Input() uploadedFile!: { file: File | null; previewUrl: string | ArrayBuffer | null };
  @Output() remove = new EventEmitter<void>();

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: [''],
      description: [''],
      startPrice: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onRemove(): void {
    this.remove.emit();
  }
}
