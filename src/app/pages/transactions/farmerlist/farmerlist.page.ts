import {
  Platform,
  IonList,
  AlertController,
  ToastController
} from "@ionic/angular";

import { Component, OnInit, ViewChild } from "@angular/core";
import { FarmerService } from 'src/app/services/farmer.service';

@Component({
  selector: "farmerlist",
  templateUrl: "./farmerlist.page.html",
  styleUrls: ["./farmerlist.page.scss"]
})
export class FarmerlistPage implements OnInit {
  ios: boolean;
  public farmers: any[] = [];
  public pagenumber: number;
  public pagesize: number;
  queryText = "";

  constructor(
    private farmerService: FarmerService,
    private plt: Platform,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.plt.ready().then(() => {
      this.pagesize = 25;
      this.pagenumber = 1;
      this.loadFarmers(null);
    });
  }

  loadFarmers(event) {
    this.queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, " ");
    const queryWords = this.queryText.split(" ").filter(w => !!w.trim().length);
    if (event) {
      setTimeout(() => {
        this.farmerService.getItems().then(items => {
          if (!items) {
            this.farmerService.makelist();
          } else {
            this.pagenumber += 1;
            items.forEach(farmer => {
              this.filterFarmer(farmer, queryWords);
            });
            items = items.filter(i => i.hide === false);
            const sorteditems = items.sort((a, b) =>
              a.farmer.lastname > b.farmer.lastname ? 1 : -1
            );
            this.farmers = this.farmers.concat(
              this.paginate(sorteditems, this.pagesize, this.pagenumber)
            );
          }
        });
        event.target.complete();
        if (this.farmers.length === 1000) {
          event.target.disabled = true;
        }
      }, 500);
    } else {
      this.farmerService.getItems().then(items => {
        if (!items) {
          this.farmerService.makelist();
        } else {
          items.forEach(farmer => {
            this.filterFarmer(farmer, queryWords);
          });
          items = items.filter(i => i.hide === false);
          const sorteditems = items.sort((a, b) =>
            a.farmer.lastname > b.farmer.lastname ? 1 : -1
          );
          this.farmers = this.paginate(
            sorteditems,
            this.pagesize,
            this.pagenumber
          );
        }
      });
    }
  }

  filterFarmer(item: any, queryWords: string[]) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (item.farmer.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    // let matchesTracks = false;
    // farmer.tracks.forEach((trackName: string) => {
    //   if (excludeTracks.indexOf(trackName) === -1) {
    //     matchesTracks = true;
    //   }
    // });

    // if the segment is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    // let matchesSegment = false;
    // if (segment === 'favorites') {
    //   if (this.user.hasFavorite(session.name)) {
    //     matchesSegment = true;
    //   }
    // } else {
    //   matchesSegment = true;
    // }

    // all tests must be true if it should not be hidden
    item.hide = !matchesQueryText;
  }

  private paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

 async deleteFarmer(x, item) {
    await x.farmerService.deletefarmer(item.objid).then(item => {
      x.showToast("Farmer removed.");
    });
    await x.loadFarmers(null);
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
