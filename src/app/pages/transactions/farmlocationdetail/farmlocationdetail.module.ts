
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmlocationdetailPageRoutingModule } from './farmlocationdetail-routing.module';

import { FarmlocationdetailPage } from './farmlocationdetail.page';
import { OlmapComponent } from 'src/app/components/olmap/olmap.component';
import { OlmapmodalComponent } from 'src/app/components/olmapmodal/olmapmodal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmlocationdetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FarmlocationdetailPage, OlmapComponent, OlmapmodalComponent]
})
export class FarmlocationdetailPageModule {}
