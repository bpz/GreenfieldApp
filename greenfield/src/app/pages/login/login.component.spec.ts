import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy }]

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
    const usernameElement: HTMLElement = fixture.nativeElement;
    const input = usernameElement.querySelector('.container .loginBox form .loginForm #iusername');
    expect(input.attributes.getNamedItem('type').textContent).toEqual('text');
    expect(input.attributes.getNamedItem('placeholder').textContent).toEqual('Username');
  });

  it('should have a password input', () => {
    const passwordElement: HTMLElement = fixture.nativeElement;
    const input = passwordElement.querySelector('.container .loginBox form .loginForm #ipassword');
    expect(input.attributes.getNamedItem('type').textContent).toEqual('password');
    expect(input.attributes.getNamedItem('placeholder').textContent).toEqual('Password');
  });

  it('login bottom says Login', () => {
    const buttonElement: HTMLElement = fixture.nativeElement;
    const btn = buttonElement.querySelector('.container .loginBox form button');
    expect(btn.textContent).toEqual('Login');
  });

  it('login cleans form', () => {
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

  it('login button calls login', () => {
    const user = "1234";
    const pass = "1234";
    component.onSubmit({ username: user, password: pass });

    expect(authServiceSpy.login).toHaveBeenCalledWith(user, pass);
  });
});
