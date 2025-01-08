import {Component} from '@angular/core';
import {AuctionCardComponent} from '../auction-card/auction-card.component';
import {AuctionListComponent} from '../auction-list/auction-list.component';

@Component({
  selector: 'app-home',
  imports: [
    AuctionListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  auctions = [
    {
      imgSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      description: 'This is a description',
      id: 1,
      userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      userName: 'Shiba Inu'
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
      id: 1,
      userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      userName: 'Shiba Inu'
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
      id: 1,
      userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      userName: 'Shiba Inu'
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      description: 'This is a description',
      id: 2,
      userAvatar: '',
      userName: 'Caule'
    },
  ];
}
