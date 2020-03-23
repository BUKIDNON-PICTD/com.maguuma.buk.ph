import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmlocationcommodityPageRoutingModule } from './farmlocationcommodity-routing.module';

import { FarmlocationcommodityPage } from './farmlocationcommodity.page';
import { OlmapmoduleModule } from 'src/app/modules/olmapmodule/olmapmodule.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmlocationcommodityPageRoutingModule,
    ReactiveFormsModule,
    OlmapmoduleModule
  ],
  declarations: [FarmlocationcommodityPage]
})
export class FarmlocationcommodityPageModule {}
