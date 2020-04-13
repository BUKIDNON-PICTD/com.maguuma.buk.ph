import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerlistPageRoutingModule } from './farmerlist-routing.module';

import { FarmerlistPage } from './farmerlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerlistPageRoutingModule
  ],
  declarations: [FarmerlistPage]
})
export class FarmerlistPageModule {}
