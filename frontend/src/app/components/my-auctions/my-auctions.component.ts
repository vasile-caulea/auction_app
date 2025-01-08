import {Component} from '@angular/core';
import {AuctionListComponent} from '../auction-list/auction-list.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

enum Sections {
  MyAuctions = 1,
  MyBids = 2,
  AddAuction = 3,
}

@Component({
  selector: 'app-my-auctions',
  imports: [
    AuctionListComponent,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatButton,
    NgIf
  ],
  templateUrl: './my-auctions.component.html',
  styleUrl: './my-auctions.component.css'
})
export class MyAuctionsComponent {
  Sections = Sections;
  activeSection: Sections = Sections.MyAuctions;
  auctions = [
    {
      imgSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      description: 'This is a description',
      id: 2,
      userAvatar: '',
      userName: 'Caule'
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      description: 'This is a description',
      id: 2,
      userAvatar: '',
      userName: 'Caule'
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      description: 'This is a description',
      id: 2,
      userAvatar: '',
      userName: 'Caule'
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      description: 'This is a description',
      id: 2,
      userAvatar: '',
      userName: 'Caule'
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      description: 'This is a description',
      id: 2,
      userAvatar: '',
      userName: 'Caule'
    },
  ];

  setActiveSection(section: Sections): void {
    this.activeSection = section;
  }

  isSectionActive(section: Sections): boolean {
    return this.activeSection === section;
  }
}
