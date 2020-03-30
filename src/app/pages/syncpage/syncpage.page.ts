import { MapService } from './../../services/map.service';
import { takeWhile, expand } from "rxjs/operators";
import { ConnectionStatus } from "./../../interfaces/connectionstatus";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SyncService } from "src/app/services/sync.service";
import { Platform, ToastController, IonContent, IonList } from "@ionic/angular";
import { OfflineManagerService } from "src/app/services/offlinemanager.service";
import { NetworkService } from "src/app/services/network.service";
import { Storage } from "@ionic/storage";
import { SettingService } from "src/app/services/setting.service";
import { empty, Subscription } from "rxjs";
import { FarmerService } from "src/app/services/farmer.service";

@Component({
  selector: "app-syncpage",
  templateUrl: "./syncpage.page.html",
  styleUrls: ["./syncpage.page.scss"]
})
export class SyncpagePage implements OnInit {
  @ViewChild("loglist", { static: false }) loglist: IonContent;
  syncFarmerProgress = 0;
  prepFarmerProgress = 0;
  showProgressbarForMasterFileSync = false;
  showProgressbarForFarmerPreparation = false;
  showProgressbarForFarmerSync = false;

  syncinprogress = false;
  syncserverstatus = false;

  logs = [];

  private subscription: Subscription[] = [];
  syncFarmerProgressText: string;

  constructor(
    private syncService: SyncService,
    private platform: Platform,
    private offlineManager: OfflineManagerService,
    private networkService: NetworkService,
    private storage: Storage,
    private toastController: ToastController,
    private settingservice: SettingService,
    private farmerService: FarmerService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      console.log(this.networkService.getCurrentSyncServerStatus());
      this.networkService.onSyncServerStatusChange().subscribe( (syncserverstatus: ConnectionStatus) => {
        if (syncserverstatus === ConnectionStatus.Online) {
          this.syncserverstatus = true;
          // this.showToast("Sync Server is Online");
        } else {
          this.syncserverstatus = false;
          // this.showToast("Sync Server is Offline");
        }
      });
    });
  }

  startSync() {
    this.syncinprogress = true;

    this.showProgressbarForMasterFileSync = true;
    this.settingservice.getItems().then(items => {
      this.subscription.push(
        this.syncService.getMasterFilesFromServer(items).subscribe(
          res => {},
          err => {
            this.showToast(err);
          },
          async () => {
            await this.mapService.makemap();
            this.showToast("Master file sync completed!");
            this.showProgressbarForMasterFileSync = false;
          }
        )
      );
    });
    this.showProgressbarForFarmerSync = true;
    this.settingservice.getItems().then(items => {
      this.subscription.push(
        this.syncService
          .syncFarmerData(items)
          .pipe(
            expand(response =>
              response.data.totalforsync > 0 &&
              response.data.totalforsync != response.data.totalsynced
                ? this.syncService.syncFarmerData(items)
                : empty()
            )
          )
          .subscribe(
            response => {
              if (typeof response.data === "object" && response.data !== null) {
                let data = response.data;
                if (data.totalforsync > 0) {
                  this.syncFarmerProgress =
                    data.totalsynced / data.totalforsync;
                  this.syncFarmerProgressText =
                    data.totalsynced + " /" + data.totalforsync;

                  if (this.logs.length === 100) {
                    this.logs = [];
                  }
                  for (let farmer of data.farmers) {
                    this.logs.push({
                      message:
                        farmer.objid + " " + farmer.farmer.name + " Synced."
                    });
                  }
                  this.loglist.scrollToBottom(300);
                } else {
                  this.syncFarmerProgress = 100;
                }
              }
            },
            err => {
              this.showToast(err);
            },
            async () => {
              await this.farmerService.makelist();
              this.showToast("Farmer Sync Complete!");
              this.showProgressbarForFarmerSync = false;
              this.syncinprogress = false;
            }
          )
      );
    });
  }

  stopSync() {
    this.syncinprogress = false;
    this.subscription.forEach(sub => sub.unsubscribe());
    this.showProgressbarForMasterFileSync = false;
    this.showProgressbarForFarmerPreparation = false;
    this.showProgressbarForFarmerSync = false;
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }
}
