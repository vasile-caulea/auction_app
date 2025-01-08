import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    let token = localStorage.getItem('token');
    this.isLoggedInSubject.next(!!token);
  }

  setLoggedIn() {
    this.isLoggedInSubject.next(true);
  }

  setLoggedOut() {
    this.isLoggedInSubject.next(false);
  }
}
