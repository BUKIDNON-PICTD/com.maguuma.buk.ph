import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportlistPageRoutingModule } from './reportlist-routing.module';

import { ReportlistPage } from './reportlist.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FarmerlistPageModule } from '../farmerlist/farmerlist.module';
import { FarmerlistcrosstabPageModule } from '../farmerlistcrosstab/farmerlistcrosstab.module';
import { ComodityareacrosstabPageModule } from '../comodityareacrosstab/comodityareacrosstab.module';
import { ComodityfarmercrosstabPageModule } from '../comodityfarmercrosstab/comodityfarmercrosstab.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportlistPageRoutingModule,
    PdfViewerModule,
    FarmerlistPageModule,
    FarmerlistcrosstabPageModule,
    ComodityareacrosstabPageModule,
    ComodityfarmercrosstabPageModule
  ],
  declarations: [ReportlistPage]
})
export class ReportlistPageModule {}
