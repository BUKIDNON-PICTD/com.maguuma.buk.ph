import { MasterService } from './../../../services/master.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'commodity',
  templateUrl: './commodity.page.html',
  styleUrls: ['./commodity.page.scss'],
})
export class CommodityPage implements OnInit {
  // @ViewChild("commoditySlider", { static: true }) commoditySlider;
  items: any[] = [];
  currentmastertype: any;
  prevmastertype: any;
  selecteditem: any;
  constructor(private master: MasterService, private plt: Platform) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.getCommodity();
      this.currentmastertype = 'Commodity';
    });
  }

  getCommodity() {
    this.master.getMasterFile('master_commodity').then(items => {
      this.items = items;
    });
  }
  getCommodityType(parentid) {
    this.items = [];
    this.master.getMasterFile('master_commodity_type').then(items => {
      for (let i of items){
        if (i.commodity.objid === parentid) {
          this.items.push(i);
        }
      }
    });
  }

  getCommodityVariety(parentid) {
    this.items = [];
    this.master.getMasterFile('master_commodity_variety').then(items => {
      for (let i of items){
        if (i.commoditytype.objid === parentid) {
          this.items.push(i);
        }
      }
    });
  }

  itemSelected(item) {
    if (this.currentmastertype === 'Commodity') {
      this.currentmastertype = 'Commodity Type';
      this.prevmastertype = 'Commodity';
      this.getCommodityType(item.objid);
      this.selecteditem = item;
    }else if (this.currentmastertype === 'Commodity Type') {
      this.currentmastertype = 'Commodity Variety';
      this.prevmastertype = 'Commodity Type';
      this.getCommodityVariety(item.objid);
      this.selecteditem = item;
    }
  }

  prevItems(){
    if (this.currentmastertype === 'Commodity Type') {
      this.currentmastertype = 'Commodity';
      this.prevmastertype = null;
      this.getCommodity();
    }else if (this.currentmastertype === 'Commodity Variety') {
      this.currentmastertype = 'Commodity Type';
      this.prevmastertype = 'Commodity';
      this.getCommodityType(this.selecteditem.commodity.objid);
    }
  }

}
