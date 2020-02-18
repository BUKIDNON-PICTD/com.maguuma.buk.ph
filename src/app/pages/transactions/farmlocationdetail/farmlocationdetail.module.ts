import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmlocationdetailPageRoutingModule } from './farmlocationdetail-routing.module';

import { FarmlocationdetailPage } from './farmlocationdetail.page';
import { MapComponent } from 'src/app/components/map/map.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmlocationdetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FarmlocationdetailPage, MapComponent]
})
export class FarmlocationdetailPageModule {}
