import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {UtilsService} from './utils.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private utilsService: UtilsService, private router: Router) {
  }

  signup(userBody: any): Observable<any> {
    let body = {
      email: userBody.email,
      password: userBody.password,
      birthDate: userBody.birthDate,
      firstName: userBody.fName,
      lastName: userBody.lName,
    }
    console.log(JSON.stringify(body))
    return this.http.post(`${this.apiUrl}/users`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(tap((response: any) => {
      this.router.navigate(['/sign-in']);
    }));
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, JSON.stringify(credentials), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(tap((response: any) => {
      localStorage.setItem('token', response['access_token']);
      this.utilsService.setLoggedIn();
      this.router.navigate(['/']);
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this.utilsService.setLoggedOut();
    this.router.navigate(['/sign-in']);
  }
}
