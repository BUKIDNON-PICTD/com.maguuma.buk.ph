import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  templateUrl: 'tabs-page.html'
})

export class TabsPage implements OnInit {
  loggedIn = false;
  constructor(
    private authService: AuthService,
  ) {

  }
  async ngOnInit() {
    this.checkLoginStatus();
    // this.listenForLoginEvents();
  }


  checkLoginStatus() {
    this.authService.authenticationState.subscribe(state => {
      this.loggedIn = state;
    });
  }

  // listenForLoginEvents() {
  //   window.addEventListener('user:login', () => {
  //     this.updateLoggedInStatus(true);
  //   });

  //   window.addEventListener('user:signup', () => {
  //     this.updateLoggedInStatus(true);
  //   });

  //   window.addEventListener('user:logout', () => {
  //     this.updateLoggedInStatus(false);
  //   });
  // }

  // updateLoggedInStatus(loggedIn: boolean) {
  //   setTimeout(() => {
  //     this.loggedIn = loggedIn;
  //   }, 300);
  // }
}
