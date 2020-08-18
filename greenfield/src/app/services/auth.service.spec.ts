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
    // Inject both the service-to-test and its (spy) dependency
    service = TestBed.inject(AuthService);
    apiServiceSpy = TestBed.inject(APIService) as jasmine.SpyObj<APIService>
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('login saves token', () => {
    const stubValue = 'token';
    apiServiceSpy.getToken.and.returnValue(of(stubValue));

    let service = new AuthService(apiServiceSpy);
    service.login('', '');

    service.isLoggedIn().subscribe(
      response => expect(response).toEqual(true, 'expected logged in true'),
      fail
    );
  });
});
