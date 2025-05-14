import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuardCanActivateService } from '../../../../core/guards/auth-guard-can-activate.service';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate:[AuthGuardCanActivateService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
