import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommodityPage } from './commodity.page';

const routes: Routes = [
  {
    path: '',
    component: CommodityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommodityPageRoutingModule {}
