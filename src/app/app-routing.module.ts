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
    canActivate: [AuthGuardService]
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
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'tutorial',
  //   loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
  //   canLoad: [CheckTutorial]
  // },
  // maguuma modules
  {
    path: 'farminventorylist',
    loadChildren: () => import('./pages/transactions/farminventorylist/farminventorylist.module').then( m => m.FarminventorylistPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'farmerlist',
    loadChildren: () => import('./pages/transactions/farmerlist/farmerlist.module').then( m => m.FarmerlistPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'commodity',
    loadChildren: () => import('./pages/master/commodity/commodity.module').then( m => m.CommodityPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'facility',
    loadChildren: () => import('./pages/master/facility/facility.module').then( m => m.FacilityPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'livestock',
    loadChildren: () => import('./pages/master/livestock/livestock.module').then( m => m.LivestockPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'syncpage',
    loadChildren: () => import('./pages/syncpage/syncpage.module').then( m => m.SyncpagePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'capturefarmer',
    loadChildren: () => import('./pages/transactions/capturefarmer/capturefarmer.module').then( m => m.CapturefarmerPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'assistance',
    loadChildren: () => import('./pages/master/assistance/assistance.module').then( m => m.AssistancePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'surveyperiod',
    loadChildren: () => import('./pages/master/surveyperiod/surveyperiod.module').then( m => m.SurveyperiodPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'introduction',
    loadChildren: () => import('./pages/introduction/introduction.module').then( m => m.IntroductionPageModule),
    canLoad: [CheckIntroduction]
  },
  {
    path: 'report',
    loadChildren: () => import('./reports/reportlist/reportlist.module').then( m => m.ReportlistPageModule),
    canActivate: [AuthGuardService]
  },
  {path: '404', component: PagenotfoundComponent},
  {path: '**', redirectTo: '/404'},
  {
    path: 'farmerlist',
    loadChildren: () => import('./reports/farmerlist/farmerlist.module').then( m => m.FarmerlistPageModule)
  },
  {
    path: 'farmerlistcrosstab',
    loadChildren: () => import('./reports/farmerlistcrosstab/farmerlistcrosstab.module').then( m => m.FarmerlistcrosstabPageModule)
  },
  {
    path: 'comodityfarmercrosstab',
    loadChildren: () => import('./reports/comodityfarmercrosstab/comodityfarmercrosstab.module').then( m => m.ComodityfarmercrosstabPageModule)
  },
  {
    path: 'comodityareacrosstab',
    loadChildren: () => import('./reports/comodityareacrosstab/comodityareacrosstab.module').then( m => m.ComodityareacrosstabPageModule)
  },
  {
    path: 'usermanagement',
    loadChildren: () => import('./pages/usermanagement/usermanagement.module').then( m => m.UsermanagementPageModule)
  },
  {
    path: 'rolemanagement',
    loadChildren: () => import('./pages/rolemanagement/rolemanagement.module').then( m => m.RolemanagementPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
