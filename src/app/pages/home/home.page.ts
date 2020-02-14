import { Component } from '@angular/core';
import { SyncService } from 'src/app/services/sync.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public syncProgress = 0;
  constructor(private syncService: SyncService) {
    this.syncService.resetProgress();
    this.syncService.syncProgress.subscribe((progress) => {
      console.log(progress);
      this.syncProgress = progress;
    });
  }

}
