import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit {
  username: string;
  password: string;
  confirmpassword: string;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    public authService: AuthService
  ) { }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setUsername(data.username);
            this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  getUsername() {
    this.username = this.authService.user.username;
    // this.userData.getUsername().then((username) => {
    //   this.username = username;
    // });
  }

  async changePassword() {
    const alert = await this.alertCtrl.create({
      header: 'Change Password',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {

            if (data.password !== data.confirmpassword) {
                alert.setAttribute('message', 'Password must match.');
                return false;
            } else {
                data.username = this.authService.user.username;
                this.authService.changepassword(data).subscribe( res => {
                  // this.authService.login(data).subscribe();
                  return true;
                });
                // alert.setAttribute('message', 'Password updated.');
                // return true;
            }

            // this.userData.setUsername(data.username);
            // this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'password',
          name: 'password',
          value: this.password,
          placeholder: 'password'
        },
        {
          type: 'password',
          name: 'confirmpassword',
          value: this.confirmpassword,
          placeholder: 'confirm password'
        }
      ]
    });
    await alert.present();
  }

  logout() {
    this.authService.logout();
  }

  // support() {
  //   this.router.navigateByUrl('/support');
  // }
}
