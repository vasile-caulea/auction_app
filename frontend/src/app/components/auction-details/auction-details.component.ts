import {Component, OnInit} from '@angular/core';
import {AuctionDataService} from '../../passing-data-services/auction-data.service';
import {AuctionInterface} from '../../interfaces/auction.interface';
import {AuctionCreatorInterface} from '../../interfaces/auction-creator.interface';
import {Router} from '@angular/router';
import {AuctionObjectService} from '../../services/auction-object.service';
import {AuctionObjectInterface} from '../../interfaces/auction-object.interface';
import {NgForOf} from '@angular/common';
import {AuctionObjectCardComponent} from '../auction-object-card/auction-object-card.component';

@Component({
  selector: 'app-auction-details',
  imports: [
    NgForOf,
    AuctionObjectCardComponent
  ],
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css'
})
export class AuctionDetailsComponent implements OnInit {

  auction: AuctionInterface | any;
  auctionCreator: AuctionCreatorInterface | any;
  auctionObjects: AuctionObjectInterface[] = [];

  constructor(private router: Router, private passDataService: AuctionDataService, private auctionObjectService: AuctionObjectService) {
  }

  async ngOnInit() {
    const data = this.passDataService.getAuctionData();
    console.log(data);
    if (!data.auction || !data.creator) {
      await this.router.navigate(['/auctions']);
      return;
    }
    this.auction = data.auction;
    this.auctionCreator = data.creator;

    this.auctionObjectService.retrieveAuctionObjects(this.auction.id).subscribe({
      next: (data) => {
        this.auctionObjects = this.auctionObjectService.getAuctionObjectsFromResponse(data);
        console.log(this.auctionObjects);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
