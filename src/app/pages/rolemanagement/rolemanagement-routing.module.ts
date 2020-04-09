import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolemanagementPage } from './rolemanagement.page';

const routes: Routes = [
  {
    path: '',
    component: RolemanagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolemanagementPageRoutingModule {}
