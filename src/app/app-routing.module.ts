import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './modules/sso/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { NewCIPMComponent } from './modules/icms/cipm/new-cipm/new-cipm.component';
import { NewDACGMComponent } from './modules/icms/dacgm/new-dacgm/new-dacgm.component'
import { NewDCQComponent } from './modules/icms/dcq/new-dcq/new-dcq.component';
import { NewFraudComponent } from './modules/icms/ifr/new-ifr/new-ifr.component';
import { UpdateHistoryComponent } from './modules/ecx/ecx-history/update-history.component';
import { NewAccountComponent } from './modules/ecx/accounts/newAccount/newAccount.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',
    component: DefaultLayoutComponent, canActivate: [AuthGuard],
    data: { title: 'Home' },

    children: [
      {
        path: 'updateAccount/:id', component: NewAccountComponent, data: {title: 'Account / Update Account'}
      },
      {
        path: 'ecx/balance/updateHistory/:batchNumber', component: UpdateHistoryComponent, data: {title: 'History / Update History'}
      },
      {
        path: 'updateCIPM/:id', component: NewCIPMComponent, data: { title: 'CIPM / Update CIPM' }
      },
      {
        path: 'updateDACGM/:id', component: NewDACGMComponent, data: { title: 'DACGM / Update DACGM' }
      },
      {
        path: 'updateDCQ/:id', component: NewDCQComponent, data: { title: 'Dishonoured Cheque / Update Dishonoured Cheque' }
      },
      {
        path: 'updateFraud/:id', component: NewFraudComponent, data: { title: 'Incident Fraud Component / Update Incident Fraud Component' }
      },
      {
        path: 'cc_dashboard',
        loadChildren: () =>
          import('./modules/cc/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'icms_dashboard',
        loadChildren: () =>
          import('./modules/icms/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'cms_dashboard',
        loadChildren: () =>
          import('./modules/cms/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'default_dashboard',
        loadChildren: () =>
          import('./containers/default-layout/default-dashboard/default-dashboard.module').then((m) => m.DefaultDashboardModule)
      },
      {
        path: 'CMS',
        loadChildren: () =>
          import('./modules/cms/cms.module').then((m) => m.CMSModule)
      },
      {
        path: 'EMS',
        loadChildren: () =>
          import('./modules/ems/ems.module').then((m) => m.EMSModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/sso/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'ICMS/user',
        loadChildren: () =>
          import('./modules/sso/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'ecx/user',
        loadChildren: () =>
          import('./modules/sso/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'SASV/user',
        loadChildren: () =>
          import('./modules/sso/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'CC/user',
        loadChildren: () =>
          import('./modules/sso/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'module',
        loadChildren: () =>
          import('./modules/sso/module/module.module').then((m) => m.ModuleModule)
      },
      {
        path: 'SASV/authority',
        loadChildren: () =>
          import('./modules/sasv/authority/authority.module').then((m) => m.AuthorityModule)
      },
      {
        path: 'ICMS/CIPM',
        loadChildren: () =>
          import('./modules/icms/cipm/cipm.module').then((m) => m.CIPMModule)
      },
      {
        path: 'ICMS/DACGM',
        loadChildren: () =>
          import('./modules/icms/dacgm/dacgm.module').then((m) => m.DACGMModule)
      },
      {
        path: 'ICMS/DCQ',
        loadChildren: () =>
          import('./modules/icms/dcq/dcq.module').then((m) => m.DCQModule)
      },
      {
        path: 'ICMS/Fraud',
        loadChildren: () =>
          import('./modules/icms/ifr/ifr.module').then((m) => m.FraudModule)
      },
      {
        path: 'CC',
        loadChildren: () =>
          import('./modules/cc/cc.module').then((m) => m.CCModule)
      },
      {
        path: 'sasvViewerLogin',
        loadChildren: () =>
          import('./modules/sasv/sasv-viewer/sasv-viewer-login.module').then((m) => m.sasvViewerLoginModule)
      },
      {
        path: 'ecx/account',
        loadChildren: () =>
          import('./modules/ecx/accounts/account.module').then((m) => m.AccountModule)
      },
      {
        path: 'ecx',
        loadChildren: () =>
          import('./modules/ecx/ecx.module').then((m) => m.ECXModule)
      },
      {
        path: 'Memo',
        loadChildren: () =>
          import('./modules/memo/memo.module').then((m) => m.MemoModule)
      },
    ]
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
