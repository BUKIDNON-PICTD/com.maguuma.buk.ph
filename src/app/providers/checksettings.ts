import { SettingService } from './../services/setting.service';
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class CheckSettingAvailable implements CanLoad {
  constructor(private storage: Storage, private router: Router, private settingService: SettingService) {}

  canLoad() {
    return this.settingService.getItems().then( items => {
      if (!items) {
        this.router.navigate(['/introduction']);
        return false;
      } else {
        return true;
      }
    });
  }
}
