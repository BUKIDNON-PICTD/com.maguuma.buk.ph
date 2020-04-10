import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';
import { CheckIntroduction } from './providers/checkintroduction.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CheckSettingAvailable } from './providers/checksettings';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/introduction',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuardService],
    data: {
      roles:['admin','muni','prov']
    }
  },
  // {
  //   path: 'support',
  //   loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule),
  //   canLoad: [CheckSettingAvailable]
  // },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    // canLoad: [CheckSettingAvailable]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule),
    // canLoad: [CheckSettingAvailable]
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule),
    canActivate: [AuthGuardService],
    data: {
      roles:['admin','muni','prov']
    }
  },

  // maguuma modules
  {
    path: 'farminventorylist',
    loadChildren: () => import('./pages/transactions/farminventorylist/farminventorylist.module').then( m => m.FarminventorylistPageModule),
    canActivate: [AuthGuardService],
    data: {
      roles:['admin','muni','prov']
    }
  },
  {
    path: 'farmerlist',
    loadChildren: () => import('./pages/transactions/farmerlist/farmerlist.module').then( m => m.FarmerlistPageModule),
    canActivate: [AuthGuardService],
    data: {
      roles:['admin','muni','prov']
    }
  },
  {
    path: 'commodity',
    loadChildren: () => import('./pages/master/commodity/commodity.module').then( m => m.CommodityPageModule),
    canActivate: [AuthGuardService],
    data: {
      roles:['admin','muni','prov']
    }
  },
  {
    path: 'facility',
    loadChildren: () => import('./pages/master/facility/facility.module').then( m => m.FacilityPageModule),
    canActivate: [AuthGuardService],
    data: {
      roles:['admin','muni','prov']
    }
  },
  {
    path: 'livestock',
    loadChildren: () => import('./pages/master/livestock/livestock.module').then( m => m.LivestockPageModule),
    canActivate: [AuthGuardService],
    data: {
      roles:['admin','muni','prov']
    }
  },
  {
    path: 'surveyperiod',
    loadChildren: () => import('./pages/master/surveyperiod/surveyperiod.module').then( m => m.SurveyperiodPageModule),
    canActivate: [AuthGuardService],
    data: {
      roles:['admin','muni','prov']
    }
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuardService],
    data: {
      roles:['admin','muni','prov']
    }
  },
  {
    path: 'syncpage',
    loadChildren: () => import('./pages/syncpage/syncpage.module').then( m => m.SyncpagePageModule),
    canActivate: [AuthGuardService],
    data: {
      roles:['admin','muni','prov']
    }
  },
  {
    path: 'capturefarmer',
    loadChildren: () => import('./pages/transactions/capturefarmer/capturefarmer.module').then( m => m.CapturefarmerPageModule),
    canActivate: [AuthGuardService],
    data: {
      roles:['admin','muni','prov']
    }
  },
  {
    path: 'introduction',
    loadChildren: () => import('./pages/introduction/introduction.module').then( m => m.IntroductionPageModule),
    canLoad: [CheckIntroduction]
  },
  {
    path: 'report',
    loadChildren: () => import('./reports/reportlist/reportlist.module').then( m => m.ReportlistPageModule),
    canActivate: [AuthGuardService],
    data: {
      roles:['admin','muni','prov']
    }
  },
  {
    path: 'usermanagement',
    loadChildren: () => import('./pages/usermanagement/usermanagement.module').then( m => m.UsermanagementPageModule),
    data: {
      roles:['admin']
    }
  },
  {
    path: 'rolemanagement',
    loadChildren: () => import('./pages/rolemanagement/rolemanagement.module').then( m => m.RolemanagementPageModule),
    data: {
      roles:['admin']
    }
  },
  {path: '404', component: PagenotfoundComponent},
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
