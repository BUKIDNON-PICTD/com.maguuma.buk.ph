import { LoginOptions } from './../../interfaces/user-options';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: LoginOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    public authService: AuthService
  ) {
    // if (this.authService.isAuthenticated) {
    //   this.router.navigateByUrl('/app/tabs/about');
    // }
    // this.userData.isLoggedIn().then( isLoggedIn => {
    //   if (isLoggedIn) {
    //     this.router.navigateByUrl('/app/tabs/about');
    //   }
    // });
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
