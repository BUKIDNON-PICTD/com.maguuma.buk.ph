import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CheckIntroduction implements CanLoad {
  constructor(private storage: Storage, private router: Router, private authService: AuthService) {}

  canLoad() {
    return this.storage.get('ion_did_intro').then( res => {
      if (res) {
        if (this.authService.isAuthenticated) {
          this.router.navigate(['/app/tabs/about']);
        } else {
          this.router.navigate(['/login']);
        }
        // console.log(this.userData.isLoggedIn());
        // if (this.userData.isLoggedIn()) {
        //   this.router.navigate(['/app/tabs/about']);
        //   return false;
        // }
        // this.router.navigate(['/login']);
        // this.userData.isLoggedIn().then( isLoggedIn => {
        //   if (isLoggedIn) {
        //     this.router.navigate(['/app/tabs/about']);
        //   } else {
        //     this.router.navigate(['/login']);
        //   }
        // });

        return false;
      } else {
        return true;
      }
    });
  }
}
