import { Injectable } from "@angular/core";
import { SettingService } from './setting.service';

@Injectable()
export class AppConfigService {
  public version: string;
  public syncserver: string;
  public reportserver: string;
  public lguname: string;

  constructor(private settingService: SettingService) {}

  load(): Promise<any> {
    const promise = this.settingService
      .getItemByName("syncserver")
      .then((item) => {
        if (item) {
          this.syncserver = item.value;
        }
      });

      this.settingService
      .getItemByName("reportserver")
      .then((item) => {
        if (item) {
          this.reportserver = item.value;
        }
      });

      this.settingService
      .getItemByName("lguname")
      .then((item) => {
        if (item) {
          this.lguname = item.value;
        }
      });

    return promise;
  }
}
