import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { GraphRoutingModule } from './graph-routing.module';
import { GraphComponent } from './graph.component';
import { ConfigurationSideNavComponent } from './configuration-side-nav/configuration-side-nav.component';


@NgModule({
  declarations: [
    GraphComponent,
    ConfigurationSideNavComponent
  ],
  imports: [
    CommonModule,
    GraphRoutingModule,
    MatTabsModule,
    MatSlideToggleModule
  ]
})
export class GraphModule { }
