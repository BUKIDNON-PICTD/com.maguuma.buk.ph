import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsermanagementPageRoutingModule } from './usermanagement-routing.module';

import { UsermanagementPage } from './usermanagement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsermanagementPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UsermanagementPage]
})
export class UsermanagementPageModule {}
