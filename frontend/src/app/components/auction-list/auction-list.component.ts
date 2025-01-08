import {Component, Input, ViewChild, Output, EventEmitter, OnInit} from '@angular/core';
import {AuctionCardComponent} from '../auction-card/auction-card.component';
import {NgForOf} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {AuctionInterface} from '../../interfaces/auction.interface';
import {AuctionCreatorInterface} from '../../interfaces/auction-creator.interface';

@Component({
  selector: 'app-auction-list',
  imports: [
    AuctionCardComponent,
    NgForOf,
    MatPaginator,
  ],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.css'
})
export class AuctionListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  @Input() auctions!: AuctionInterface[];
  @Input() auctionsCreators!: AuctionCreatorInterface[];

  @Input()
  set numberOfAuctions(value: number) {
    this.paginatorLength = value;
  }

  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  paginatorLength: number = 0;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  ngOnInit() {
    this.pageChange.emit({
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.paginatorLength
    });
  }
}
