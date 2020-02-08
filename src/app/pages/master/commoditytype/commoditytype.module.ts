import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommoditytypePageRoutingModule } from './commoditytype-routing.module';

import { CommoditytypePage } from './commoditytype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommoditytypePageRoutingModule
  ],
  declarations: [CommoditytypePage]
})
export class CommoditytypePageModule {}
