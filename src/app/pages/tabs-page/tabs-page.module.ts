import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { AboutModule } from '../about/about.module';

import { ScheduleModule } from '../schedule/schedule.module';
import { SessionDetailModule } from '../session-detail/session-detail.module';
import { SpeakerDetailModule } from '../speaker-detail/speaker-detail.module';
import { SpeakerListModule } from '../speaker-list/speaker-list.module';
import { HomePageModule } from '../home/home.module';
import { FarminventorylistPageModule } from '../transactions/farminventorylist/farminventorylist.module';
import { FarmerlistPageModule } from '../transactions/farmerlist/farmerlist.module';
import { CapturefarmPageModule } from '../transactions/capturefarm/capturefarm.module';
import { CapturefarmerPageModule } from '../transactions/capturefarmer/capturefarmer.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    ScheduleModule,
    SessionDetailModule,
    SpeakerDetailModule,
    SpeakerListModule,
    TabsPageRoutingModule,
    HomePageModule,
    FarminventorylistPageModule,
    FarmerlistPageModule,
    CapturefarmPageModule,
    CapturefarmerPageModule,
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
