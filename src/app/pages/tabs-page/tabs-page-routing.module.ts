import { EntityindividualPage } from '../transactions/entityindividual/entityindividual.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { HomePage } from '../home/home.page';
import { FarminventorylistPage } from '../transactions/farminventorylist/farminventorylist.page';
import { FarmerlistPage } from '../transactions/farmerlist/farmerlist.page';
import { CapturefarmerPage } from './../transactions/capturefarmer/capturefarmer.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            component: HomePage,
          }
          // ,
          // {
          //   path: 'session/:sessionId',
          //   // loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          // }
        ]
      },
      {
        path: 'entityindividual',
        children: [
          {
            path: '',
            component: EntityindividualPage,
          }
          // ,
          // {
          //   path: 'session/:sessionId',
          //   // loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          // }
        ]
      },
      {
        path: 'farmerlist',
        children: [
          {
            path: '',
            component: FarmerlistPage,
          },
          {
            path: 'farmerdetail/:farmerid',
            loadChildren: () => import('../transactions/farmerdetail/farmerdetail.module').then(m => m.FarmerdetailPageModule)
          },
          {
            path: 'farmlocationdetail/:locationid',
            loadChildren: () => import('../transactions/farmlocationdetail/farmlocationdetail.module').then(m => m.FarmlocationdetailPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

