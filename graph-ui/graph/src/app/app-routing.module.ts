import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './layouts/public/public.component';
import { AuthComponent } from './layouts/auth/auth.component';

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
