import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AdminComponent } from './layouts/admin/admin.component';
import { PublicComponent } from './layouts/public/public.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/public/sing-in',
    pathMatch: 'full'
  },
  {
    path: 'public',
    component: PublicComponent,
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
  // ,
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   children: [
  //     {
  //       path: 'home',
  //       loadChildren: () => import('./views/admin/home/home.module').then(m => m.HomeModule)
  //     },
  //     {
  //       path: 'profile',
  //       loadChildren: () => import('./views/admin/profile/profile.module').then(m => m.ProfileModule)
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
