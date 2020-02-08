import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntityindividualPageRoutingModule } from './entityindividual-routing.module';

import { EntityindividualPage } from './entityindividual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntityindividualPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EntityindividualPage]
})
export class EntityindividualPageModule {}
