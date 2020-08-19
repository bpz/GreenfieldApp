import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginInfo: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.loginInfo = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(data: any) {
    await this.authService.login(data.username, data.password);
    this.loginInfo.reset();
  }
}
