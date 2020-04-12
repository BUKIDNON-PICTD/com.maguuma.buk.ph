import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.page.html',
  styleUrls: ['./usermanagement.page.scss'],
})
export class UsermanagementPage implements OnInit {
  ios: boolean;
  public users: any[] = [];
  public pagenumber: number;
  public pagesize: number;
  queryText = "";

  constructor(
    private userService: UserService,
    private plt: Platform,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.plt.ready().then(() => {
      this.pagesize = 25;
      this.pagenumber = 1;
      this.loadUsers(null);
    });
  }

  loadUsers(event) {
    this.queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, " ");
    const queryWords = this.queryText.split(" ").filter(w => !!w.trim().length);
    if (event) {
      setTimeout(() => {
        this.userService.getItems().then(items => {

          if (!items) {
            //
          } else {
            this.pagenumber += 1;
            items.forEach(user => {
              this.filterUser(user, queryWords);
            });
            items = items.filter(i => i.hide === false);
            const sorteditems = items.sort((a, b) =>
              a.lastname > b.lastname ? 1 : -1
            );
            this.users = this.users.concat(
              this.paginate(sorteditems, this.pagesize, this.pagenumber)
            );
          }
        });
        event.target.complete();
        if (this.users.length === 1000) {
          event.target.disabled = true;
        }
      }, 500);
    } else {
      this.userService.getItems().then(items => {

        if (!items) {
          //
        } else {
          items.forEach(user => {
            this.filterUser(user, queryWords);
          });
          items = items.filter(i => i.hide === false);
          const sorteditems = items.sort((a, b) =>
            a.lastname > b.lastname ? 1 : -1
          );
          this.users = this.paginate(
            sorteditems,
            this.pagesize,
            this.pagenumber
          );
        }
      });
    }
  }

  filterUser(item: any, queryWords: string[]) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (item.user.lastname.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    item.hide = !matchesQueryText;
  }

  private paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

 async deleteuser(x, item) {
    await x.userService.deleteuser(item.objid).then(item => {
      x.showToast("user removed.");
    });
    await x.loadUsers(null);
  }

  async presentAlertConfirm(item, method) {
    const alert = await this.alertController.create({
      header: "Confirm Delete!",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Okay",
          handler: () => {
            console.log("Confirm Okay");
            method(this, item);
          }
        }
      ]
    });

    await alert.present();
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }
}
