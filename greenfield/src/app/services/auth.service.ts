import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = new Observable<boolean>();
  private token: string;

  constructor(private http: HttpClient) {
   }

  login(username: string, password: string): string {
    // As API is not ready, we use this harcoded token

    return environment.token;
  }
}
