import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuctionInterface} from '../interfaces/auction.interface';
import {AuctionCreatorInterface} from '../interfaces/auction-creator.interface';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private httpClient: HttpClient) {
  }

  createAuction(data: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/auctions', JSON.stringify(data), {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
  }

  createAuctionObject(auctionId: string, data: any, file: File | null): Observable<any> {
    let formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('startPrice', data.startPrice.toString());

    return this.httpClient.post(`http://localhost:3000/auctions/${auctionId}/items`, formData, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }


  getAuctionsObjectFromResult(result: any) {
    let auctions = [];
    let auctionCreators = [];

    for (let auction of result) {
      let a: AuctionInterface = {
        createdAt: new Date(auction.createdAt),
        description: auction.description,
        imgSrc: auction.imgSrc || '',
        id: auction._id,
        title: auction.title
      }
      let aU: AuctionCreatorInterface = {
        id: auction.createdBy._id,
        userAvatar: auction.createdBy.profileImg || '',
        firstName: auction.createdBy.firstName,
        lastName: auction.createdBy.lastName
      }
      auctions.push(a);
      auctionCreators.push(aU);
    }
    return {
      auctions: auctions,
      auctionCreators: auctionCreators
    }
  }

  getNumberOfAuctions() {
    return this.httpClient.get('http://localhost:3000/auctions/count');
  }

  getAuctionsPageable(page: number, size: number) {
    return this.httpClient.get(`http://localhost:3000/auctions?page=${page}&page-size=${size}`);
  }

  getNumberOfUserAuctions() {
    return this.httpClient.get(`http://localhost:3000/auctions/user/count/`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getUserAuctionsPageable(page: number, size: number) {
    return this.httpClient.get(`http://localhost:3000/auctions/user?page=${page}&page-size=${size}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}
