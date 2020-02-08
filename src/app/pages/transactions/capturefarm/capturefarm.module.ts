import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapturefarmPageRoutingModule } from './capturefarm-routing.module';

import { CapturefarmPage } from './capturefarm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapturefarmPageRoutingModule
  ],
  declarations: [CapturefarmPage]
})
export class CapturefarmPageModule {}
