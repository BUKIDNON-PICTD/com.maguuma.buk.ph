import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.page.html',
  styleUrls: ['./assistance.page.scss'],
})
export class AssistancePage implements OnInit {

  items: any[] = [];
  currentmastertype: any;
  prevmastertype: any;
  selecteditem: any;
  constructor(private master: MasterService, private plt: Platform) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.getAssistanceClassification();
      this.currentmastertype = 'Assistance Classification';
    });
  }

  getAssistanceClassification() {
    this.master.getMasterFile('master_assistance_classification').then(items => {
      this.items = items;
    });
  }
  getAssistanceType(parentid) {
    this.items = [];
    this.master.getMasterFile('master_assistance_type').then(items => {
      for (let i of items){
        if (i.classification.objid === parentid) {
          this.items.push(i);
        }
      }
    });
  }

  itemSelected(item) {
    if (this.currentmastertype === 'Assistance Classification') {
      this.currentmastertype = 'Assistance Type';
      this.prevmastertype = 'Assistance Classification';
      this.getAssistanceType(item.objid);
      this.selecteditem = item;
    }
  }

  prevItems(){
    if (this.currentmastertype === 'Assistance Type') {
      this.currentmastertype = 'Assistance Classification';
      this.prevmastertype = null;
      this.getAssistanceClassification();
    }
  }
}
