import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn: Observable<boolean>;
  private token: string;

  constructor(private apiService: APIService) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.token = storedToken;
      this.loggedIn = of(true);
    } else {
      this.loggedIn = of(false);
    }
  }

  login(username: string, password: string) {
    if (username && password) {
      return this.apiService.getToken(username, password)
        .subscribe((response: any) => {
          if (response) {
            this.token = response;
            this.loggedIn = of(true);
            localStorage.setItem('token', this.token);
          }
        });
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.loggedIn = of(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn;
  }
}
