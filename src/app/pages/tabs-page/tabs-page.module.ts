
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';
import { HomePageModule } from '../home/home.module';
import { FarminventorylistPageModule } from '../transactions/farminventorylist/farminventorylist.module';
import { FarmerlistPageModule } from '../transactions/farmerlist/farmerlist.module';
import { CapturefarmerPageModule } from './../transactions/capturefarmer/capturefarmer.module';
import { CapturefarmPageModule } from './../transactions/capturefarm/capturefarm.module';
import { EntityindividualPageModule } from '../transactions/entityindividual/entityindividual.module';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TabsPageRoutingModule,
    HomePageModule,
    FarminventorylistPageModule,
    FarmerlistPageModule,
    CapturefarmPageModule,
    CapturefarmerPageModule,
    EntityindividualPageModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
