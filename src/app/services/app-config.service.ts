import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { SettingService } from './setting.service';
import { promise } from 'protractor';

@Injectable()
export class AppConfigService {
  public version: string;
  public syncserver: string;
  public reportserver: string;
  public lguname: string;
  public lguid: string;
  public clientid: string;

  constructor(private settingService: SettingService) {}

  load(): Promise<any> {
    const promise = this.settingService
      .getItems()
      .then((items) => {
        if (items) {
          this.syncserver = items.find(o => o.name === 'syncserver').value;
          this.reportserver = items.find(o => o.name === 'reportserver').value;
          this.lguname = items.find(o => o.name === 'lguname').value;
          this.lguid = items.find(o => o.name === 'lguid').value;
          this.clientid = items.find(o => o.name === 'clientid').value;
        }
      });

    this.settingService.getSettings().subscribe( items => {
      if (items) {
        try {
          this.syncserver = items.find(o => o.name === 'syncserver').value;
          this.reportserver = items.find(o => o.name === 'reportserver').value;
          this.lguname = items.find(o => o.name === 'lguname').value;
          this.lguid = items.find(o => o.name === 'lguid').value;
          this.clientid = items.find(o => o.name === 'clientid').value;
        } catch (e) {
          console.log(e);
        }

      }
    });

    return promise;
  }
}
