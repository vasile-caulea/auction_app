import {Component} from '@angular/core';
import {MatListItem, MatNavList} from '@angular/material/list';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    MatNavList,
    MatListItem,
    NgForOf,
    MatIcon,
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn: boolean = true;

  links = [
    {name: 'Home', route: '/home'},
    {name: 'My Auctions', route: '/auctions'}
  ];
}
