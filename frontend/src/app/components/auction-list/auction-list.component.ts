import {Component, Input} from '@angular/core';
import {AuctionCardComponent} from '../auction-card/auction-card.component';
import {NgForOf} from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';

interface Auction {
  imgSrc: string;
  description: string;
  id: number;
  userAvatar: string;
  userName: string;
}

@Component({
  selector: 'app-auction-list',
  imports: [
    AuctionCardComponent,
    NgForOf,
    MatPaginator
  ],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.css'
})
export class AuctionListComponent {
  @Input() auctions: Auction[] = [];

  paginatorLength: number = 100;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
}
