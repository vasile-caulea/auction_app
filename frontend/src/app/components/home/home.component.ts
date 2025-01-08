import {Component, OnInit} from '@angular/core';
import {AuctionListComponent} from '../auction-list/auction-list.component';
import {AuctionInterface} from '../../interfaces/auction.interface';
import {AuctionCreatorInterface} from '../../interfaces/auction-creator.interface';
import {AuctionService} from '../../services/auction.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  imports: [
    AuctionListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  auctionsObjects = {
    auctions: Array<AuctionInterface>(),
    auctionCreators: Array<AuctionCreatorInterface>(),
  };

  numberOfAuctions: number = 0;
  pageSize: number = 10;

  constructor(private auctionService: AuctionService) {
  }

  async ngOnInit() {
    this.auctionService.getNumberOfAuctions().subscribe({
      next: (response: any) => {
        this.numberOfAuctions = response.count;
        this.auctionService.getAuctionsPageable(0, this.pageSize).subscribe({
          next: (response) => {
            this.auctionsObjects = this.auctionService.getAuctionsObjectFromResult(response);
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    let page = event.pageIndex;
    this.pageSize = event.pageSize;

    this.auctionService.getAuctionsPageable(page, this.pageSize).subscribe({
      next: (response) => {
        this.auctionsObjects = this.auctionService.getAuctionsObjectFromResult(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
