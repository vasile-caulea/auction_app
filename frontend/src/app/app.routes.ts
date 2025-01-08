import {Routes} from '@angular/router';

import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {HomeComponent} from './components/home/home.component';
import {MyAuctionsComponent} from './components/my-auctions/my-auctions.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AuctionDetailsComponent} from './components/auction-details/auction-details.component';
import {AuctionObjectDetailsComponent} from './components/auction-object-details/auction-object-details.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'auctions', component: MyAuctionsComponent},
  {path: 'auction', component: AuctionDetailsComponent},
  {path: 'auction-object', component: AuctionObjectDetailsComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/:userid', component: ProfileComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];
