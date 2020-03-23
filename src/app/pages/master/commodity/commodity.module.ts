import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommodityPageRoutingModule } from './commodity-routing.module';

import { CommodityPage } from './commodity.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommodityPageRoutingModule
  ],
  declarations: [CommodityPage]
})
export class CommodityPageModule {}
