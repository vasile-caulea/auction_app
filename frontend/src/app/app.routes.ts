import {Routes} from '@angular/router';

import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {HomeComponent} from './home/home.component';
import {MyAuctionsComponent} from './my-auctions/my-auctions.component';
import {ProfileComponent} from './profile/profile.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'auctions', component: MyAuctionsComponent},
  {path: 'auction/:id', component: HomeComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];
