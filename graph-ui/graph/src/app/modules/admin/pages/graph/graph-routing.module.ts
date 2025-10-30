import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './graph.component';
import { AuthGuardCanActivateService } from '../../../../core/guards/auth-guard-can-activate.service';

const routes: Routes = [
  {
    path: '',
    component: GraphComponent,
    // canActivate:[AuthGuardCanActivateService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphRoutingModule { }
