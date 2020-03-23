import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  // maguuma modules
  {
    path: 'farminventorylist',
    loadChildren: () => import('./pages/transactions/farminventorylist/farminventorylist.module').then( m => m.FarminventorylistPageModule)
  },
  {
    path: 'farmerlist',
    loadChildren: () => import('./pages/transactions/farmerlist/farmerlist.module').then( m => m.FarmerlistPageModule)
  },
  {
    path: 'commodity',
    loadChildren: () => import('./pages/master/commodity/commodity.module').then( m => m.CommodityPageModule)
  },
  {
    path: 'facility',
    loadChildren: () => import('./pages/master/facility/facility.module').then( m => m.FacilityPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'capturefarm',
    loadChildren: () => import('./pages/transactions/capturefarm/capturefarm.module').then( m => m.CapturefarmPageModule)
  },
  {
    path: 'capturefarmer',
    loadChildren: () => import('./pages/transactions/capturefarmer/capturefarmer.module').then( m => m.CapturefarmerPageModule)
  },
  {
    path: 'entityindividual',
    loadChildren: () => import('./pages/transactions/entityindividual/entityindividual.module').then( m => m.EntityindividualPageModule)
  },
  {
    path: 'livestock',
    loadChildren: () => import('./pages/master/livestock/livestock.module').then( m => m.LivestockPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'syncpage',
    loadChildren: () => import('./pages/syncpage/syncpage.module').then( m => m.SyncpagePageModule)
  },
  {
    path: 'capturefarmer',
    loadChildren: () => import('./pages/transactions/capturefarmer/capturefarmer.module').then( m => m.CapturefarmerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
