import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InnerComponent } from './inner.component';
import { AuthGuard, NotAuthGuard } from '../_helpers';

const routes: Routes = [
  {
    path: '',
    component: InnerComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../inner/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../inner/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'about',
        loadChildren: () => import('../inner/about/about.module').then(m => m.AboutInModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'contact',
        loadChildren: () => import('../inner/contact/contact.module').then(m => m.ContactInModule),
        canActivate: [AuthGuard]
      }

    ]
  },
  { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginInModule), canActivate: [NotAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnerRoutingModule { }
