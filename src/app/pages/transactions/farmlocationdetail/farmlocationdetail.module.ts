import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmlocationdetailPageRoutingModule } from './farmlocationdetail-routing.module';

import { FarmlocationdetailPage } from './farmlocationdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmlocationdetailPageRoutingModule
  ],
  declarations: [FarmlocationdetailPage]
})
export class FarmlocationdetailPageModule {}
