import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Router]
    });

    authServiceSpy = jasmine.createSpyObj('AuthService',
    ['isAuthenticated', 'updatePage']);
    service = new AuthGuardService(authServiceSpy as AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('canActivate when authenticated, true', () => {
    let stubValue = true;
    authServiceSpy.isAuthenticated.and.returnValue(stubValue);

    expect(service.canActivate()).toBeTrue();
  });

  it('canActivate when not authenticated, false and updatePage', () => {
    let stubValue = false;
    authServiceSpy.isAuthenticated.and.returnValue(stubValue);

    expect(service.canActivate()).toBeFalse();
    expect(authServiceSpy.updatePage).toHaveBeenCalled();
  });
});
