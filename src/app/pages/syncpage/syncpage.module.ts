import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SyncpagePageRoutingModule } from './syncpage-routing.module';

import { SyncpagePage } from './syncpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyncpagePageRoutingModule
  ],
  declarations: [SyncpagePage]
})
export class SyncpagePageModule {}
