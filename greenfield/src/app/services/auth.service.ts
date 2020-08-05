import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = of(false);
  private token: string;

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.token = storedToken;
      this.loggedIn = of(true);
    }
  }

  login(username: string, password: string): string {
    // As API is not ready, we use this harcoded token
    this.token = environment.token;
    this.loggedIn = of(true);

    localStorage.setItem('token', this.token);
    
    return this.token;
  }

  logout() {
    this.token = null;
    this.loggedIn = of(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn;
  }
}
