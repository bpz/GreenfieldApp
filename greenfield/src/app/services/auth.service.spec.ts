import { TestBed, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { APIService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { asyncData } from 'testing/helper.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../pages/login/login.component';
import { LogoutComponent } from '../pages/logout/logout.component';

describe('AuthService', () => {
  let service: AuthService;
  let apiServiceSpy: jasmine.SpyObj<APIService>;
  let router: Router;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('APIService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
          .withRoutes([
            { path: '', component: LoginComponent },
            { path: 'login', component: LoginComponent },
            { path: 'logout', component: LogoutComponent },
            { path: '**', redirectTo: '' }
          ])
      ],
      providers: [
        { provide: APIService, useValue: apiServiceSpy },
      ],
    });

    router = TestBed.get(Router);

    service = new AuthService(apiServiceSpy as APIService, router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('log out, not authenticated', () => {
    service.logout();

    // const navigateSpy = spyOn(router, 'navigate');
    // expect(navigateSpy).toHaveBeenCalledWith(['login']);

    expect(service.isAuthenticated()).toBeFalse();
  });

  it('log in with empty params, not authenticated', async () => {
    service.logout();

    await service.login('', '');

    expect(service.isAuthenticated()).toBeFalse();
  });

  it('log in with non-empty params, authenticated', async () => {
    const stubValue = environment.token;
    const user = "1234";
    const pass = "1234";

    service.logout();

    apiServiceSpy.getToken.and.returnValue(asyncData(stubValue));
    await service.login(user, pass);

    expect(service.isAuthenticated()).toBeTrue();
  });

  it('getToken returns empty, not authenticated', async () => {
    const stubValue = "";
    const user = "1234";
    const pass = "1234";

    apiServiceSpy.getToken.and.returnValue(asyncData(stubValue));

    service.logout();
    await service.login(user, pass);

    expect(service.isAuthenticated()).toBeFalse();
  });
});
