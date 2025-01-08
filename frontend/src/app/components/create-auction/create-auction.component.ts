import {ChangeDetectorRef, Component, inject, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {AuctionService} from '../../services/auction.service';
import {AuctionObjectComponent} from '../auction-object/auction-object.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

interface UploadedFile {
  file: File | null;
  previewUrl: string | ArrayBuffer | null;
}


@Component({
  selector: 'app-create-auction',
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgForOf,
    MatButton,
    NgIf,
    FormsModule,
    AuctionObjectComponent,
  ],
  templateUrl: './create-auction.component.html',
  styleUrl: './create-auction.component.css',
  providers: [provideNativeDateAdapter()],
})
export class CreateAuctionComponent {
  private _snackBar = inject(MatSnackBar);
  auctionForm: FormGroup;
  uploadedFiles: UploadedFile[] = [];
  coverImage: UploadedFile = {file: null, previewUrl: null};

  @ViewChildren(AuctionObjectComponent) imageCards!: QueryList<AuctionObjectComponent>;

  collectFormData(): any[] {
    return this.imageCards.map((card) => card.formGroup.value);
  }

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private auctionService: AuctionService,
              private router: Router) {
    this.auctionForm = fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    })
  }

  createAuction() {
    console.log(this.collectFormData());
    let objects = this.imageCards.map((card) => card.formGroup);
    if (this.auctionForm.valid && objects.length > 0 && objects.every((obj) => obj.valid)) {
      this.auctionService.createAuction(this.auctionForm.value).subscribe({
        next: (response) => {
          console.log(response);
          let id = response.id;

          this._snackBar.open('Auction created.. Uploading objects..', 'OK')

          for (let i = 0; i < objects.length; i++) {
            this.auctionService.createAuctionObject(id, objects[i].value, this.uploadedFiles[i].file).subscribe({
              next: (response) => {
                console.log(response);
                if (i === objects.length - 1) {
                  this._snackBar.open('Auction created..', 'OK')
                }
              },
              error: (err) => {
                console.log(err);
              }
            })

          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const files = Array.from(input.files);

      files.forEach((file) => {
        const reader = new FileReader();
        const uploadedFile: UploadedFile = {file, previewUrl: null};

        reader.onloadend = (e: ProgressEvent<FileReader>) => {
          uploadedFile.previewUrl = e.target?.result || null;
          this.uploadedFiles.push(uploadedFile);
          this.cdr.detectChanges();
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onRemove(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  doUpload(event: any): void {
    event.preventDefault();
    document.getElementById('fileInput')?.click();
  }

  doUploadCoverPhoto(event: MouseEvent) {
    event.preventDefault();
    document.getElementById('coverImageInput')?.click();
  }

  onCoverPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const file = input.files[0];

      const reader = new FileReader();

      const uploadedFile: UploadedFile = {file, previewUrl: null};

      reader.onload = (e: ProgressEvent<FileReader>) => {
        uploadedFile.previewUrl = e.target?.result || null;
        this.coverImage = uploadedFile;
        this.cdr.detectChanges();
      };

      reader.readAsDataURL(file);
    }
  }
}
