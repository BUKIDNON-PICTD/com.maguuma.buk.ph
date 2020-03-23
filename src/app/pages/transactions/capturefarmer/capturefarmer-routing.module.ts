import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapturefarmerPage } from './capturefarmer.page';

const routes: Routes = [
  {
    path: '',
    component: CapturefarmerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapturefarmerPageRoutingModule {}
