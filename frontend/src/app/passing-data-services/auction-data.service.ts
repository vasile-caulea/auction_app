import {Injectable} from '@angular/core';
import {AuctionInterface} from '../interfaces/auction.interface';
import {AuctionCreatorInterface} from '../interfaces/auction-creator.interface';

@Injectable({
  providedIn: 'root'
})
export class AuctionDataService {
  private auctionData: AuctionInterface | any;
  private auctionCreator: AuctionCreatorInterface | any;

  setAuctionData(auction: AuctionInterface, creator: AuctionCreatorInterface): void {
    this.auctionData = auction;
    this.auctionCreator = creator;
  }

  getAuctionData(): any {
    return {auction: this.auctionData, creator: this.auctionCreator};
  }
}
