import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-auction-details',
  imports: [],
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css'
})
export class AuctionDetailsComponent implements OnInit {
  auctionID!: number;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.auctionID = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Auction ID:', this.auctionID);
  }

}
