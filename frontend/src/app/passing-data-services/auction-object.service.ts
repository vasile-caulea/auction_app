import {Injectable} from '@angular/core';
import {AuctionObjectInterface} from '../interfaces/auction-object.interface';

@Injectable({
  providedIn: 'root'
})
export class AuctionObjectService {
  private auctionObjects: AuctionObjectInterface | any;

  setAuctionObjectDetails(auctionObject: AuctionObjectInterface): void {
    this.auctionObjects = auctionObject;
  }

  getAuctionObjectDetails(): any {
    return this.auctionObjects;
  }
}
