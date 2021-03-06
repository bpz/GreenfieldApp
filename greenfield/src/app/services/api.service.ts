import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class APIService {

  constructor(private http: HttpClient) { }

  public getToken(username: string, password: string): Observable<string> {
    return this.http.get<string>(environment.loginUrl)
      .pipe(
        catchError(this.handleError<string>('getToken', ''))
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}