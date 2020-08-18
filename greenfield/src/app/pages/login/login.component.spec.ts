import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  class MockAuthService {
    isLoggedIn = of(true);
    token = "1234";
    login = function (user: string, pass: string) { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useClass: MockAuthService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a logo', () => {
    const logoElement: HTMLElement = fixture.nativeElement;
    const img = logoElement.querySelector('.container .loginBox .logo');
    expect(img.attributes.getNamedItem('alt').textContent).toEqual('Karumi Logo');
  });

  it('should have a username input', () => {
    fixture.detectChanges();
    const usernameElement: HTMLElement = fixture.nativeElement;
    const input = usernameElement.querySelector('.container .loginBox form .loginForm #iusername');
    expect(input.attributes.getNamedItem('type').textContent).toEqual('text');
    expect(input.attributes.getNamedItem('placeholder').textContent).toEqual('Username');
  });

  it('should have a password input', () => {
    fixture.detectChanges();
    const passwordElement: HTMLElement = fixture.nativeElement;
    const input = passwordElement.querySelector('.container .loginBox form .loginForm #ipassword');
    expect(input.attributes.getNamedItem('type').textContent).toEqual('password');
    expect(input.attributes.getNamedItem('placeholder').textContent).toEqual('Password');
  });

  it('login bottom says Login', () => {
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.nativeElement;
    const btn = buttonElement.querySelector('.container .loginBox form button');
    expect(btn.textContent).toEqual('Login');
  });

  it('login cleans form', () => {
    fixture.detectChanges();

    const user = "1234";
    const pass = "1234";
    component.onSubmit({ user: user, password: pass });

    const passwordElement: HTMLElement = fixture.nativeElement;
    const passInput = passwordElement.querySelector('.container .loginBox form .loginForm #ipassword');
    expect(passInput.textContent).toEqual("");

    const usernameElement: HTMLElement = fixture.nativeElement;
    const userInput = usernameElement.querySelector('.container .loginBox form .loginForm #iusername');
    expect(userInput.textContent).toEqual("");
  });
});
