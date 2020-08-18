import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { APIService } from './api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let apiServiceSpy: jasmine.SpyObj<APIService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['getValue']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: APIService, useValue: spy }],
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('log out removes token and makes login status false', inject([AuthService], (service: AuthService) => {
    service.logout();

    var token = localStorage.getItem('token');
    expect(token).toBeNull();

    service.isLoggedIn().subscribe(
      response => expect(response).toBeFalse(),
      fail
    );
  }));

  it('log in with empty params, not logged', inject([AuthService], (service: AuthService) => {
    service.logout();
    service.login('', '');

    var token = localStorage.getItem('token');
    expect(token).toBeNull();

    service.isLoggedIn().subscribe(
      response => expect(response).toBeFalse(),
      fail
    );
  }));

  it('log in with non-empty params, logged', () => {
    const stubValue = "1234";
    const user = "1234";
    const pass = "1234";
    const fake = { getToken: (user: string, pass: string) => of(stubValue) };

    let service = new AuthService(fake as APIService);
    service.logout();
    service.login(user, pass);

    var token = localStorage.getItem('token');
    expect(token).toBeTruthy();

    service.isLoggedIn().subscribe(
      response => expect(response).toBeTrue(),
      fail
    );
  });

  it('getToken returns empty, do nothing', () => {
    const stubValue = "";
    const user = "1234";
    const pass = "1234";
    const fake = { getToken: (user: string, pass: string) => of(stubValue) };

    localStorage.setItem('token', "1234");

    let service = new AuthService(fake as APIService);
    service.logout();
    service.login(user,pass);

    service.isLoggedIn().subscribe(
      response => expect(response).toBeFalse(),
      fail
    );
  });
});
