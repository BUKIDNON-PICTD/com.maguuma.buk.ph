import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommodityvarietyPage } from './commodityvariety.page';

const routes: Routes = [
  {
    path: '',
    component: CommodityvarietyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommodityvarietyPageRoutingModule {}
