import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../core/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const ITEM_TOKEN_NAME : string = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API : string = environment.apiGatewayUrl;
  private readonly GATEWAY : string = 'auth-service';
  private readonly CONTROLLER : string = 'Auth';
  private http = inject(HttpClient);
  private router = inject(Router);
  private helper = new JwtHelperService();

  signIn(email: string, password: string): Observable<User> {
    const body = {
      email : email, 
      password : password
    };
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<User>(`${this.API}/${this.GATEWAY}/${this.CONTROLLER}/SingIn`, body, { headers: headers })
                    .pipe(
                      catchError(this.errorHandler),
                      map((userResponse : User) => {
                        this.setToken(userResponse.tokenResponse.accessToken);
                        return userResponse;
                    }));
  }

  getToken(): string | null {
    return localStorage.getItem(ITEM_TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(ITEM_TOKEN_NAME, token);
  }

  removeToken(): void {
    localStorage.removeItem(ITEM_TOKEN_NAME);
  }

  get isLoggedIn(): boolean {
    const token = this.getToken();
    return !this.helper.isTokenExpired(token);
  }

  logout() {
    this.removeToken();
    this.router.navigate(['auth/sing-in']);
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) 
    {
      console.error('An error occurred:', error.error.message);
    } 
    else 
    {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError(() => error);
  }
}
