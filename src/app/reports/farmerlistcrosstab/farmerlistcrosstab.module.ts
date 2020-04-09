import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerlistcrosstabPageRoutingModule } from './farmerlistcrosstab-routing.module';

import { FarmerlistcrosstabPage } from './farmerlistcrosstab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerlistcrosstabPageRoutingModule
  ],
  declarations: [FarmerlistcrosstabPage]
})
export class FarmerlistcrosstabPageModule {}
