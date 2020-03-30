import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    public authService: AuthService
  ) {
    this.userData.isLoggedIn().then( isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigateByUrl('/app/tabs/about');
      }
    });
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authService.login(form.value).subscribe();

    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
