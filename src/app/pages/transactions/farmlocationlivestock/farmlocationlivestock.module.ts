import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmlocationlivestockPageRoutingModule } from './farmlocationlivestock-routing.module';

import { FarmlocationlivestockPage } from './farmlocationlivestock.page';
import { OlmapmoduleModule } from 'src/app/modules/olmapmodule/olmapmodule.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmlocationlivestockPageRoutingModule,
    ReactiveFormsModule,
    OlmapmoduleModule
  ],
  declarations: [FarmlocationlivestockPage]
})
export class FarmlocationlivestockPageModule {}
