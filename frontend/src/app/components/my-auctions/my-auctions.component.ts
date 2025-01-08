import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {AuctionListComponent} from '../auction-list/auction-list.component';
import {CreateAuctionComponent} from '../create-auction/create-auction.component';
import {AuctionInterface} from '../../interfaces/auction.interface';
import {AuctionService} from '../../services/auction.service';
import {AuctionCreatorInterface} from '../../interfaces/auction-creator.interface';
import {PageEvent} from '@angular/material/paginator';

enum Sections {
  MyAuctions = 1,
  MyBids = 2,
  AddAuction = 3,
}

@Component({
  selector: 'app-my-auctions',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatSidenavContent,
    MatSidenav,
    MatSidenavContainer,
    MatButton,
    MatButton,
    MatInputModule,
    MatDatepickerModule,
    AuctionListComponent,
    CreateAuctionComponent
  ],
  templateUrl: './my-auctions.component.html',
  styleUrl: './my-auctions.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAuctionsComponent implements OnInit {
  Sections = Sections;
  activeSection: Sections = Sections.MyAuctions;

  pageSize: number = 5;
  numberOfAuctions: number = 0;

  auctionsObjects: {
    auctions: Array<AuctionInterface>;
    auctionCreators: Array<AuctionCreatorInterface>;
  };

  constructor(private auctionService: AuctionService, private cdr: ChangeDetectorRef) {
    this.auctionsObjects = {
      auctions: [],
      auctionCreators: []
    }
  }

  async ngOnInit() {
    this.auctionService.getNumberOfUserAuctions().subscribe(
      (response: any) => {
        console.log(response);
        this.numberOfAuctions = response.count;
        this.auctionService.getUserAuctionsPageable(0, this.pageSize).subscribe({
          next: (response) => {
            this.auctionsObjects = this.auctionService.getAuctionsObjectFromResult(response);
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    );
  }

  setActiveSection(section: Sections): void {
    this.activeSection = section;
  }

  isSectionActive(section: Sections): boolean {
    return this.activeSection === section;
  }

  onPageChange(event: PageEvent) {
    let index = event.pageIndex;
    this.pageSize = event.pageSize;
    this.auctionService.getUserAuctionsPageable(index, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.auctionsObjects = this.auctionService.getAuctionsObjectFromResult(response);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
