import { TestBed, async, ComponentFixture, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { FormBuilder } from '@angular/forms';
import { LogoutComponent } from './pages/logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';


describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let login: Element;
  let logout: Element;

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).overrideComponent(LogoutComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
    login = fixture.nativeElement.querySelector('#login');
    logout = fixture.nativeElement.querySelector('#logout');
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'greenfield'`, () => {
    expect(app.title).toEqual('greenfield');
  });
});
