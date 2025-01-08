import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BidsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private socket: Socket, private httpClient: HttpClient) {
  }

  placeBid(auctionObjectId: string, value: number) {
    return this.httpClient.post(`${this.baseUrl}/bids`, {auctionObjectId: auctionObjectId, amount: value}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getAllBids(auctionObjectId: string) {
    return this.httpClient.get(`${this.baseUrl}/bids/${auctionObjectId}`);
  }

  getBids(auctionObjectId: string): Observable<any> {
    return this.socket.fromEvent(`bids/${auctionObjectId}`);
  }
}
