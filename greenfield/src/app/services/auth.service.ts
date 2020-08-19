import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string;
  private jwtHelperService: JwtHelperService;

  constructor(
    private apiService: APIService,
    private router: Router) {
    this.jwtHelperService = new JwtHelperService();

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.token = storedToken;
    }
  }

  public async login(username: string, password: string) {
    if (username && password) {
      return this.apiService.getToken(username, password)
        .subscribe((response: any) => {
          if (response) {
            this.token = response;
            localStorage.setItem('token', this.token);
            if (this.isAuthenticated()) {
              this.router.navigate(['logout']);
            }
          }
        });
    }
  }

  public logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  public isAuthenticated(): boolean {
    if (this.token) {
      if (!this.jwtHelperService.isTokenExpired(this.token)) {
        return true;
      }
      this.logout();
    }
    return false;
  }
}
