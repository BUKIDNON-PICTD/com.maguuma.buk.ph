import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComodityfarmercrosstabPageRoutingModule } from './comodityfarmercrosstab-routing.module';

import { ComodityfarmercrosstabPage } from './comodityfarmercrosstab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComodityfarmercrosstabPageRoutingModule
  ],
  declarations: [ComodityfarmercrosstabPage]
})
export class ComodityfarmercrosstabPageModule {}
