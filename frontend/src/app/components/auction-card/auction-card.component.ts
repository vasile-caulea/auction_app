import {Component, Input} from '@angular/core';
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {Router, RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {AuctionInterface} from '../../interfaces/auction.interface';
import {AuctionCreatorInterface} from '../../interfaces/auction-creator.interface';
import {AuctionDataService} from '../../passing-data-services/auction-data.service';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-auction-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardImage,
    RouterLink,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardAvatar,
    NgOptimizedImage,
    MatTooltip
  ],
  templateUrl: './auction-card.component.html',
  styleUrl: './auction-card.component.css'
})
export class AuctionCardComponent {

  @Input() auction!: AuctionInterface;
  @Input() auctionCreator!: AuctionCreatorInterface;

  constructor(private router: Router, private passDataService: AuctionDataService) {
  }

  goToDetails() {
    this.passDataService.setAuctionData(this.auction, this.auctionCreator);
    this.router.navigate(['/auction']);
  }

  getFormattedDate(): string {
    return this.auction.createdAt.toLocaleString('ro-RO', {timeZone: 'EET'});
  }

  auctionCardImgW: number = 300;
  auctionCardImgH: number = 300;
  auctionCardAvatarW: number = 100;
  auctionCardAvatarH: number = 100;
}
