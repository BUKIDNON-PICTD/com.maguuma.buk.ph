import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      folderid: 'txn',
      title: 'Transaction',
      items: [
        {
          title: 'About Project',
          url: '/app/tabs/about',
          icon: 'information-circle'
        },
        {
          title: 'Capture Farmer',
          url: '/capturefarmer',
          icon: 'person-add'
        },
        {
          title: 'Farmer List',
          url: '/app/tabs/farmerlist',
          icon: 'people'
        },
        {
          title: 'Farm Inventory List',
          url: '/farminventorylist',
          icon: 'map'
        }
      ]
    },
    {
      folderid: 'master',
      title: 'Master',
      items: [
        {
          title: 'Commodity',
          url: '/commodity',
          icon: 'list'
        },
        {
          title: 'Facility',
          url: '/facility',
          icon: 'build'
        },
        {
          title: 'Livestock',
          url: '/livestock',
          icon: 'paw'
        },
        {
          title: 'Assistance Classification',
          url: '/assistance',
          icon: 'heart'
        },
        {
          title: 'Survey Period',
          url: '/surveyperiod',
          icon: 'calendar'
        },
      ]

    },
    {
      folderid: 'settings',
      title: 'Settings',
      items: [
        {
          title: 'App Setting',
          url: '/settings',
          icon: 'settings'
        },
        {
          title: 'Sync Service',
          url: '/syncpage',
          icon: 'sync'
        },
      ]
    }
  ];
  loggedIn = false;
  dark = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
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

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/app/tabs/schedule');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }
}
