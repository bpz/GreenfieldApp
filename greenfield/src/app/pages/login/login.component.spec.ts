import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent]
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
    expect(img).toBeTruthy();
  });

  it('should have a username input', () => {
    const usernameElement: HTMLElement = fixture.nativeElement;
    const input = usernameElement.querySelector('.container .loginBox .loginForm #iusername');
    expect(input).toBeTruthy();
  });

  it('should have a password input', () => {
    const usernameElement: HTMLElement = fixture.nativeElement;
    const input = usernameElement.querySelector('.container .loginBox .loginForm #ipassword');
    expect(input).toBeTruthy();
  });

  it('should have a login bottom', () => {
    fixture.detectChanges();
    const usernameElement: HTMLElement = fixture.nativeElement;
    const btn = usernameElement.querySelector('.container .loginBox button');
    expect(btn).toBeTruthy();
  });

  it('logo has alt text', () => {
    fixture.detectChanges();
    const logoElement: HTMLElement = fixture.nativeElement;
    const img = logoElement.querySelector('.container .loginBox .logo');
    expect(img.attributes.getNamedItem('alt').textContent).toEqual('Karumi Logo');
  });

  it('username input is text with placeholder', () => {
    fixture.detectChanges();
    const usernameElement: HTMLElement = fixture.nativeElement;
    const input = usernameElement.querySelector('.container .loginBox .loginForm #iusername');
    expect(input.attributes.getNamedItem('type').textContent).toEqual('text');
    expect(input.attributes.getNamedItem('placeholder').textContent).toEqual('Username');
  });

  it('password input is password with placeholder', () => {
    fixture.detectChanges();
    const usernameElement: HTMLElement = fixture.nativeElement;
    const input = usernameElement.querySelector('.container .loginBox .loginForm #ipassword');
    expect(input.attributes.getNamedItem('type').textContent).toEqual('password');
    expect(input.attributes.getNamedItem('placeholder').textContent).toEqual('Password');
  });

  it('login bottom says Login', () => {
    fixture.detectChanges();
    const usernameElement: HTMLElement = fixture.nativeElement;
    const btn = usernameElement.querySelector('.container .loginBox button');
    expect(btn.textContent).toEqual('Login');
  });
});
