import {Component, OnInit} from '@angular/core';
import {MatListItem, MatNavList} from '@angular/material/list';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {UtilsService} from '../../services/utils.service';

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
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  links = [
    {name: 'Home', route: '/home'},
    {name: 'My Auctions', route: '/auctions'}
  ];

  constructor(private utils: UtilsService) {
  }

  ngOnInit() {
    this.utils.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }
}
