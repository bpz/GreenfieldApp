import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = new AuthService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
