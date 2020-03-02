import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OfflineManagerService } from './services/offlinemanager.service';
import { NetworkService } from './services/network.service';
import { ConnectionStatus } from './interfaces/connectionstatus';
import { SyncService } from './services/sync.service';
import { Storage } from '@ionic/storage';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public   appPages = [
    {
      folderid: 'txn',
      title: 'Transaction',
      items: [
        // {
        //   title: 'Individual Entity',
        //   url: '/app/tabs/entityindividual',
        //   icon: 'person-add'
        // },
        // {
        //   title: 'Capture Farmer',
        //   url: '/app/tabs/capturefarmer',
        //   icon: 'pin'
        // },
        // {
        //   title: 'Farm Inventory List',
        //   url: '/app/tabs/farmlocationlist',
        //   icon: 'map'
        // },
        {
          title: 'Farmer List',
          url: '/app/tabs/farmerlist',
          icon: 'people'
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
        }
      ]

    }
    // ,
    // {
    //   folderid: 'report',
    //   title: 'Report',
    //   items: [
    //     {

    //       title: 'Schedule',
    //       url: '/app/tabs/schedule',
    //       icon: 'calendar'
    //     },
    //     {
    //       title: 'Speakers',
    //       url: '/app/tabs/speakers',
    //       icon: 'contacts'
    //     },
    //     {
    //       title: 'Map',
    //       url: '/app/tabs/map',
    //       icon: 'map'
    //     },
    //     {
    //       title: 'About',
    //       url: '/app/tabs/about',
    //       icon: 'information-circle'
    //     }
    //   ]
    // }
    // ,
    // {
    //   folderid: 'account',
    //   title: 'Account',
    //   items: [
    //     {

    //       title: 'Schedule',
    //       url: '/app/tabs/schedule',
    //       icon: 'calendar'
    //     },
    //     {
    //       title: 'Speakers',
    //       url: '/app/tabs/speakers',
    //       icon: 'contacts'
    //     },
    //     {
    //       title: 'Map',
    //       url: '/app/tabs/map',
    //       icon: 'map'
    //     },
    //     {
    //       title: 'About',
    //       url: '/app/tabs/about',
    //       icon: 'information-circle'
    //     }
    //   ]
    // }
  ];
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private offlineManager: OfflineManagerService,
    private networkService: NetworkService,
    private storage: Storage,
    public socket: Socket
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
        if (status === ConnectionStatus.Online) {
          // this.syncService.getMasterFilesFromServer().subscribe(res => {
          //   if(typeof res.data === 'object' && res.data !== null) {
          //     Object.keys(res.data).forEach(key => {
          //       this.setLocalData(key, res.data[key]);
          //     });
          //   }
          // });
          // this.syncService.sync();
        }
      });
     
    });
  }

  // Save result of API requests
  private setLocalData(key, data) {
    this.storage.set(`${key}`, data);
  }

  // Get cached API result
  private getLocalData(key) {
    return this.storage.get(`${key}`);
  }
}
