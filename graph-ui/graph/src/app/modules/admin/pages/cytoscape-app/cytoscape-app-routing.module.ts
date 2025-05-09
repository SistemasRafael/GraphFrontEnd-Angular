import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CytoscapeAppComponent } from './cytoscape-app.component';
import { AuthGuardCanActivateService } from '../../../../core/guards/auth-guard-can-activate.service';

const routes: Routes = [
  {
    path: '',
    component: CytoscapeAppComponent,
    canActivate:[AuthGuardCanActivateService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CytoscapeAppRoutingModule { }
