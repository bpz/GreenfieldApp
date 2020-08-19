import { TestBed } from '@angular/core/testing';
import { APIService } from './api.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { asyncData, asyncError } from '../../../testing/helper.service'

describe('APIService', () => {
  let service: APIService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new APIService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a token', () => {
    const expectedToken = "1234";
    const user = "user";
    const pass = "pass";

    httpClientSpy.get.and.returnValue(asyncData(expectedToken));

    service.getToken(user, pass).subscribe(
      token => expect(token).toEqual(expectedToken, 'expected token'),
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return emtpy when the server returns error 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    const user = "user";
    const pass = "pass";
    const expectedToken = '';

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    service.getToken(user, pass).subscribe(
      token => expect(token).toBe(expectedToken, 'expected token'),
      fail
    );
  });
});
