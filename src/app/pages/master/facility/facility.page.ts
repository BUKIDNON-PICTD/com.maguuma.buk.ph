import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'facility',
  templateUrl: './facility.page.html',
  styleUrls: ['./facility.page.scss'],
})
export class FacilityPage implements OnInit {
  items: any[] = [];
  constructor(private master: MasterService, private plt: Platform) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.getFacility();
    });
  }

  getFacility() {
    this.master.getMasterFile('master_facility').then(items => {
      this.items = items;
    });
  }

}
