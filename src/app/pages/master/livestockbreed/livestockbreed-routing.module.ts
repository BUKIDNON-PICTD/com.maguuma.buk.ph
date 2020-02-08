import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivestockbreedPage } from './livestockbreed.page';

const routes: Routes = [
  {
    path: '',
    component: LivestockbreedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivestockbreedPageRoutingModule {}
