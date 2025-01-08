import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuctionObjectInterface} from '../interfaces/auction-object.interface';

@Injectable({
  providedIn: 'root'
})
export class AuctionObjectService {

  constructor(private httpClient: HttpClient) {
  }

  retrieveAuctionObjects(auctionId: string): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/auctions/${auctionId}/items`);
  }

  getAuctionObjectsFromResponse(response: any) {
    return response.map((item: any) => {
      let aO: AuctionObjectInterface = {
        id: item._id,
        title: item.title,
        imgSrc: 'http://localhost:3000/' + item.imagePath,
        price: item.price,
        description: item.description,
      }
      return aO
    });

  }
}
