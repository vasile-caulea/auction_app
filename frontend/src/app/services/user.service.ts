import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
  }

  getUserInfo(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/users/user-info`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/users/${id}`);
  }
}
