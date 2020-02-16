import { Component } from '@angular/core';
import { SyncService } from 'src/app/services/sync.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public syncEntityProgress = 0;
  public prepEntityProgress = 0;
  public syncFarmerProgress = 0;
  public prepFarmerProgress = 0;
  constructor(private syncService: SyncService) {
    this.syncService.resetSyncProgress();
    this.syncService.prepEntityProgress.subscribe((progress) => {
      console.log(progress);
      this.prepEntityProgress = progress;
    });
    this.syncService.syncEntityProgress.subscribe((progress) => {
      console.log(progress);
      this.syncEntityProgress = progress;
    });
    this.syncService.prepFarmerProgress.subscribe((progress) => {
      console.log(progress);
      this.prepFarmerProgress = progress;
    });
    this.syncService.syncFarmerProgress.subscribe((progress) => {
      console.log(progress);
      this.syncFarmerProgress = progress;
    });
  }

}
