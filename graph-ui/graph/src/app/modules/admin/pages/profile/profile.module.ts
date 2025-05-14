import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../Services/user.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from '../../../../core/interceptors/spinner.interceptor';
import { httpInterceptor } from '../../../../core/interceptors/http.interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([
      spinnerInterceptor,
      httpInterceptor
    ])),
    UserService
  ],
})
export class ProfileModule { }
