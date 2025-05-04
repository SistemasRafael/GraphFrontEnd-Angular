import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { AdminComponent } from './layouts/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/admin/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'sing-in',
        loadChildren: () => import('./modules/auth/pages/sign-in/sign-in.module').then(m => m.SignInModule)
      },
      {
        path: 'sing-up',
        loadChildren: () => import('./modules/auth/pages/sign-up/sign-up.module').then(m => m.SignUpModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
