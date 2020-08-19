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

    let storedToken = localStorage.getItem('token');
    this.token = storedToken;
    this.updatePage();
  }

  public async login(username: string, password: string) {
    if (username && password) {
      console.log(username, password);
      return this.apiService.getToken(username, password)
        .subscribe((response: any) => {
          console.log(response);
          if (response) {
            localStorage.setItem('token', response);
            this.token = response;
            this.updatePage();
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
      return !this.jwtHelperService.isTokenExpired(this.token);
    }
    return false;
  }

  public updatePage() {
    if (this.isAuthenticated()) {
      this.router.navigate(['logout']);
    } else {
      this.logout();
    }
  }
}
