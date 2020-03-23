import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-livestock',
  templateUrl: './livestock.page.html',
  styleUrls: ['./livestock.page.scss'],
})
export class LivestockPage implements OnInit {

  items: any[] = [];
  currentmastertype: any;
  prevmastertype: any;
  selecteditem: any;
  constructor(private master: MasterService, private plt: Platform) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.getLivestockSpecie();
      this.currentmastertype = 'Specie';
    });
  }

  getLivestockSpecie() {
    this.master.getMasterFile('master_livestock_species').then(items => {
      this.items = items;
    });
  }
  getLivestockBreed(parentid) {
    this.items = [];
    this.master.getMasterFile('master_livestock_breed').then(items => {
      for (let i of items){
        if (i.species.objid === parentid) {
          this.items.push(i);
        }
      }
    });
  }

  itemSelected(item) {
    if (this.currentmastertype === 'Specie') {
      this.currentmastertype = 'Breed';
      this.prevmastertype = 'Specie';
      this.getLivestockBreed(item.objid);
      this.selecteditem = item;
    }
  }

  prevItems(){
    if (this.currentmastertype === 'Breed') {
      this.currentmastertype = 'Specie';
      this.prevmastertype = null;
      this.getLivestockSpecie();
    }
  }
}
