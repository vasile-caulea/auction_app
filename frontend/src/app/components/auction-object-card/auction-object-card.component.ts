import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from '@angular/material/card';
import {AuctionObjectInterface} from '../../interfaces/auction-object.interface';
import {Router} from '@angular/router';
import {AuctionObjectService} from '../../passing-data-services/auction-object.service';

@Component({
  selector: 'app-auction-object-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage
  ],
  templateUrl: './auction-object-card.component.html',
  styleUrl: './auction-object-card.component.css'
})
export class AuctionObjectCardComponent {

  @Input() auctionObject!: AuctionObjectInterface;

  constructor(private router: Router, private passAuctionObjectService: AuctionObjectService) {
  }

  goToDetails() {
    this.passAuctionObjectService.setAuctionObjectDetails(this.auctionObject);
    this.router.navigate(['/auction-object']);
  }
}
