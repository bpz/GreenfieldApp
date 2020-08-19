import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule,],
      declarations: [LogoutComponent],
      providers:
        [{ provide: AuthService, useValue: authServiceSpy }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logout button says Logout', () => {
    const usernameElement: HTMLElement = fixture.nativeElement;
    const btn = usernameElement.querySelector('.container button');
    expect(btn.textContent).toEqual('Logout');
  });

  it('logout button calls logout', () => {
    component.onSubmit();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
