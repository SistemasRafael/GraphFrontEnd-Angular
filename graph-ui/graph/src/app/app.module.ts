import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { PublicComponent } from './layouts/public/public.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { AuthComponent } from './layouts/auth/auth.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DashboardComponent } from './modules/admin/pages/dashboard/dashboard.component';
import { AuthService } from './shared/services/auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthGuardCanActivateService } from './shared/services/auth-guard-can-activate.service';
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { httpInterceptor } from './core/interceptors/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PublicComponent,
    AuthComponent,
    SpinnerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [
    provideHttpClient(withInterceptors([
      spinnerInterceptor,
      httpInterceptor, 
    ]),),
    AuthGuardCanActivateService, 
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
