import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/providers/user-data';

@Component({
  templateUrl: 'tabs-page.html'
})

export class TabsPage implements OnInit {
  loggedIn = false;
  constructor(
    private userData: UserData,
  ) {

  }
  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
  }


  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }
}
