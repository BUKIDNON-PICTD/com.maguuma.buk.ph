import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-surveyperiod',
  templateUrl: './surveyperiod.page.html',
  styleUrls: ['./surveyperiod.page.scss'],
})
export class SurveyperiodPage implements OnInit {
  items: any[] = [];
  constructor(private master: MasterService, private plt: Platform) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.getSurveyPeriod();
    });
  }

  getSurveyPeriod() {
    this.master.getMasterFile('master_surveyperiod').then(items => {
      this.items = items;
    });
  }

}
