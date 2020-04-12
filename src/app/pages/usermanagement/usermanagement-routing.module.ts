import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsermanagementPage } from './usermanagement.page';

const routes: Routes = [
  {
    path: '',
    component: UsermanagementPage
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'user/:userid',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsermanagementPageRoutingModule {}
