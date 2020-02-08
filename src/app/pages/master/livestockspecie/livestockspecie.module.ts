import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivestockspeciePageRoutingModule } from './livestockspecie-routing.module';

import { LivestockspeciePage } from './livestockspecie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivestockspeciePageRoutingModule
  ],
  declarations: [LivestockspeciePage]
})
export class LivestockspeciePageModule {}
