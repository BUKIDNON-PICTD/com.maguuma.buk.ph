import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolemanagementPage } from './rolemanagement.page';

const routes: Routes = [
  {
    path: '',
    component: RolemanagementPage
  },
  {
    path: 'role',
    loadChildren: () => import('./role/role.module').then( m => m.RolePageModule)
  },
  {
    path: 'role/:roleid',
    loadChildren: () => import('./role/role.module').then( m => m.RolePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolemanagementPageRoutingModule {}
