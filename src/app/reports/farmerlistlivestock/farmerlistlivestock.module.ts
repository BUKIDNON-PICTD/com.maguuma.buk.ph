import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerlistlivestockPageRoutingModule } from './farmerlistlivestock-routing.module';

import { FarmerlistlivestockPage } from './farmerlistlivestock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerlistlivestockPageRoutingModule
  ],
  declarations: [FarmerlistlivestockPage]
})
export class FarmerlistlivestockPageModule {}
