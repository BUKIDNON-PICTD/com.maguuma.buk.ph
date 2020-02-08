import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapturefarmerPageRoutingModule } from './capturefarmer-routing.module';

import { CapturefarmerPage } from './capturefarmer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapturefarmerPageRoutingModule
  ],
  declarations: [CapturefarmerPage]
})
export class CapturefarmerPageModule {}
