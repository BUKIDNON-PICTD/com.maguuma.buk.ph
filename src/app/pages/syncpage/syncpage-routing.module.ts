import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SyncpagePage } from './syncpage.page';

const routes: Routes = [
  {
    path: '',
    component: SyncpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyncpagePageRoutingModule {}
