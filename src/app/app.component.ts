import { AuthService } from 'src/app/services/auth.service';
import { SettingService } from './services/setting.service';
import { OfflineManagerService } from './services/offlinemanager.service';
import { NetworkService } from './services/network.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';
import { ConnectionStatus } from './interfaces/connectionstatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent{
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
      folderid: 'report',
      title: 'Reports',
      items: [
        {
          title: 'Report list',
          url: '/report/list',
          icon: 'document'
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
        }
      ]
    },
    {
      folderid: 'admin',
      title: 'Administrator',
      items: [
        {
          title: 'User Management',
          url: '/usermangement',
          icon: 'people'
        },
        {
          title: 'Role Management',
          url: '/rolemangement',
          icon: 'key'
        }
      ]
    }
  ];
  loggedIn = false;
  dark = false;
  syncserverstatus = false;
  settingsavailable = false;
  componentloaded = false;

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
    private networkService: NetworkService,
    private offlineManager: OfflineManagerService,
    private toastController: ToastController,
    private settingService: SettingService,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

initializeApp() {
    this.platform.ready().then(() => {
      // await this.settingService.getItems().then( async items => {
      //   if (!items) {
      //     this.settingsavailable = false;
      //   } else {
      //     await this.checkLoginStatus();
      //     // await this.listenForLoginEvents();
      //     this.settingsavailable = true;
      //   }
      // });

      // await this.swUpdate.available.subscribe(async res => {
      //   const toast = await this.toastCtrl.create({
      //     message: 'Update available!',
      //     position: 'bottom',
      //     buttons: [
      //       {
      //         role: 'cancel',
      //         text: 'Reload'
      //       }
      //     ]
      //   });

      //   await toast.present();

      //   toast
      //     .onDidDismiss()
      //     .then(() => this.swUpdate.activateUpdate())
      //     .then(() => window.location.reload());
      // });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.authenticationState.subscribe(state => {
        this.loggedIn = state;
        // console.log(this.authService.hasSettings());
        if (state) {
          this.router.navigate(['/app/tabs/about']);
        } else {
          this.authService.hasSettings.subscribe( hassetting => {
            if (hassetting) {
              this.router.navigate(['/login']);
            } else {
              this.router.navigate(['/introduction']);
            }
          });
        }
      });
      this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
        if (status === ConnectionStatus.Online) {
          // this.offlineManager.checkForEvents().subscribe();
            // if (this.networkService.isSyncServerOnline()) {
            //   this.syncserverstatus = true;
            // } else {
            //   this.syncserverstatus = false;
            // }
          this.networkService.onSyncServerStatusChange().subscribe( (syncserverstatus: ConnectionStatus) => {
            if (syncserverstatus === ConnectionStatus.Online) {
              this.syncserverstatus = true;
              this.offlineManager.checkForEvents().subscribe();
              // this.showToast("Sync Server is Online");
            } else {
              this.syncserverstatus = false;
              // this.showToast("Sync Server is Offline");
            }
          });
        }
      });
      // this.componentloaded = true;
    });
  }

  // checkLoginStatus() {
  //   // return this.authService.authenticationState.subscribe(state => {
  //   //   return this.updateLoggedInStatus(state);
  //   // });

  //   this.authService.authenticationState.subscribe(state => {
  //     this.loggedIn = state;
  //   });
  //   // return this.userData.isLoggedIn().then(loggedIn => {
  //   //   console.log(loggedIn);
  //   //   return this.updateLoggedInStatus(loggedIn);
  //   // });
  // }

  // updateLoggedInStatus(loggedIn: boolean) {
  //   setTimeout(() => {
  //     this.loggedIn = loggedIn;
  //   }, 300);
  // }

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

  logout() {
    this.authService.logout();
    // this.router.navigateByUrl('/login');
    // this.userData.logout().then(() => {
    //   this.authService.logout();
    //   return this.router.navigateByUrl('/login');
    // });
  }

  // openTutorial() {
  //   this.menu.enable(false);
  //   this.storage.set('ion_did_tutorial', false);
  //   this.router.navigateByUrl('/tutorial');
  // }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }
}
