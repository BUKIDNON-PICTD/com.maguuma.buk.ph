import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { lastname: '', firstname: '', username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
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

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authService.register(form.value).subscribe(res => {
        // this.authService.login(form.value).subscribe();
      });

    }
  }
}
