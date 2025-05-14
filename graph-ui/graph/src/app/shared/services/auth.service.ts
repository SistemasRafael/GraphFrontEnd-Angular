import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../core/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const ITEM_TOKEN_NAME : string = 'token';
const ITEM_USER_ID : string = 'userId';

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

    return this.http.post<User>(`${this.API}/${this.GATEWAY}/${this.CONTROLLER}/SignIn`, body, { headers: headers })
                    .pipe(
                      catchError(this.handleResponse),
                      map((userResponse : User) => {
                        this.createLocalStorageVariables(userResponse);
                        return userResponse;
                    }));
  }

  signUp(user: User): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<User>(`${this.API}/${this.GATEWAY}/${this.CONTROLLER}/SignUp`, user, { headers: headers })
                    .pipe(
                      catchError(this.handleResponse),
                      map((userResponse : User) => {
                        this.createLocalStorageVariables(userResponse);
                        return userResponse;
                    }));
  }

  private removeLocalStorageVariables(){
    this.removeToken();
    this.removeUserId();
  }

  private createLocalStorageVariables(user : User){
    this.setUserId(user.userId);
    this.setToken(user.tokenResponse.accessToken);
  }

  getToken(): string | null {
    return localStorage.getItem(ITEM_TOKEN_NAME);
  }

  private setToken(token: string): void {
    localStorage.setItem(ITEM_TOKEN_NAME, token);
  }

  getUserId(): string | null {
    return localStorage.getItem(ITEM_USER_ID);
  }

  private setUserId(userId: string): void {
    localStorage.setItem(ITEM_USER_ID, userId);
  }

  private removeToken(): void {
    localStorage.removeItem(ITEM_TOKEN_NAME);
  }

  private removeUserId(): void {
    localStorage.removeItem(ITEM_USER_ID);
  }

  get isLoggedIn(): boolean {
    const token = this.getToken();
    return !this.helper.isTokenExpired(token);
  }

  logout() {
    this.removeLocalStorageVariables();
    this.router.navigate(['/auth/sign-in']);
  }

  private handleResponse(response : HttpErrorResponse) {
    if (response.status === 500) {
      console.log(response.status);
    }
    console.log(response.status);

    return throwError(() => response);
  }

  // private errorHandler(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) 
  //   {
  //     console.error('An error occurred:', error.error.message);
  //   } 
  //   else 
  //   {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }

  //   return throwError(() => error);
  // }
}
