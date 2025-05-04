import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { delay, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardCanActivateService {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log("AuthGuardCanActivateServiceService");
    return this.authService.isAuthenticated$.pipe(
      delay(4000),
      map((isAuth) => {
      console.log(isAuth);
      if(!isAuth)
      {
        return this.router.createUrlTree(['auth/sing-in']);
      }
  
      return true;
    }));
  }
}
