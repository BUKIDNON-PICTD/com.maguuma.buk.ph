import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapturefarmerPageRoutingModule } from './capturefarmer-routing.module';

import { CapturefarmerPage } from './capturefarmer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapturefarmerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CapturefarmerPage]
})
export class CapturefarmerPageModule {}
