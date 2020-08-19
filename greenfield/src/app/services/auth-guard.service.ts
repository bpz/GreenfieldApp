import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.auth.updatePage();
      return false;
    }
    return true;
  }
}