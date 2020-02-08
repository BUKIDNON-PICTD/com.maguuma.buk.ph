import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapturefarmPage } from './capturefarm.page';

const routes: Routes = [
  {
    path: '',
    component: CapturefarmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapturefarmPageRoutingModule {}
