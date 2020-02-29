import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmfacilitydetailPageRoutingModule } from './farmfacilitydetail-routing.module';

import { FarmfacilitydetailPage } from './farmfacilitydetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmfacilitydetailPageRoutingModule
  ],
  declarations: [FarmfacilitydetailPage]
})
export class FarmfacilitydetailPageModule {}
