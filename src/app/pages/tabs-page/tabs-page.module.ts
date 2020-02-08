
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { AboutModule } from '../about/about.module';
import { MapModule } from '../map/map.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { SessionDetailModule } from '../session-detail/session-detail.module';
import { SpeakerDetailModule } from '../speaker-detail/speaker-detail.module';
import { SpeakerListModule } from '../speaker-list/speaker-list.module';
import { HomePageModule } from '../home/home.module';
import { FarminventorylistPageModule } from '../transaction/farminventorylist/farminventorylist.module';
import { FarmerlistPageModule } from '../transaction/farmerlist/farmerlist.module';
import { CapturefarmerPageModule } from './../transaction/capturefarmer/capturefarmer.module';
import { CapturefarmPageModule } from './../transaction/capturefarm/capturefarm.module';
import { EntityindividualPageModule } from '../transaction/entityindividual/entityindividual.module';
@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
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
    EntityindividualPageModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
