import {Component, Input} from '@angular/core';
import {
  MatCard,
  MatCardActions, MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-auction-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardImage,
    MatButton,
    MatCardActions,
    RouterLink,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardAvatar,
    NgOptimizedImage
  ],
  templateUrl: './auction-card.component.html',
  styleUrl: './auction-card.component.css'
})
export class AuctionCardComponent {

  @Input() imgSrc: string = '';
  @Input() description: string = '';
  @Input() auctionID!: number;
  @Input() postDate: Date = new Date();
  @Input() userAvatar: string = '';
  @Input() userName: string = '';

  getFormattedDate(): string {
    return this.postDate.toLocaleString('ro-RO', {timeZone: 'EET'});
  }

  auctionCardImgW: number = 300;
  auctionCardImgH: number = 300;
  auctionCardAvatarW: number = 100;
  auctionCardAvatarH: number = 100;
}
