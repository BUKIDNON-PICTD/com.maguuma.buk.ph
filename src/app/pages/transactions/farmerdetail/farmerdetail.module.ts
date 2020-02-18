import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerdetailPageRoutingModule } from './farmerdetail-routing.module';

import { FarmerdetailPage } from './farmerdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerdetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FarmerdetailPage]
})
export class FarmerdetailPageModule {}
