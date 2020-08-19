import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { APIService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { asyncData } from 'testing/helper.service';

describe('AuthService', () => {
  let service: AuthService;
  let apiServiceSpy: jasmine.SpyObj<APIService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('APIService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: APIService, useValue: apiServiceSpy }],
    });

    service = new AuthService(apiServiceSpy as APIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('log out, login status false', () => {
    service.logout();

    var token = localStorage.getItem('token');
    expect(token).toBeNull();

    service.isLoggedIn().subscribe(
      response => expect(response).toBeFalse(),
      fail
    );
  });

  it('log in with empty params, not logged', async () => {
    service.logout();

    await service.login('', '');

    var token = localStorage.getItem('token');
    expect(token).toBeNull();

    service.isLoggedIn().subscribe(
      response => expect(response).toBeFalse(),
      fail
    );
  });

  it('log in with non-empty params, logged', async () => {
    const stubValue = "1234";
    const user = "1234";
    const pass = "1234";

    apiServiceSpy.getToken.and.returnValue(asyncData(stubValue));

    await service.login(user, pass);
    service.isLoggedIn().subscribe(
      response => expect(response).toBeTrue(),
      fail
    );
  });

  it('getToken returns empty, do nothing', async () => {
    const stubValue = "";
    const user = "1234";
    const pass = "1234";
 
    apiServiceSpy.getToken.and.returnValue(asyncData(stubValue));

    service.logout();
    await service.login(user, pass);

    service.isLoggedIn().subscribe(
      response => expect(response).toBeFalse(),
      fail
    );
  });
});
