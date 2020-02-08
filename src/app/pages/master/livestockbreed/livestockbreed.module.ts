import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivestockbreedPageRoutingModule } from './livestockbreed-routing.module';

import { LivestockbreedPage } from './livestockbreed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivestockbreedPageRoutingModule
  ],
  declarations: [LivestockbreedPage]
})
export class LivestockbreedPageModule {}
