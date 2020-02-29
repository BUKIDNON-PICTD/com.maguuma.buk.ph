import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmlocationcommodityPage } from './farmlocationcommodity.page';

const routes: Routes = [
  {
    path: '',
    component: FarmlocationcommodityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmlocationcommodityPageRoutingModule {}
