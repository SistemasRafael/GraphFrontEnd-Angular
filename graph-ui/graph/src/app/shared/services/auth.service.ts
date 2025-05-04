import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuth$ = new BehaviorSubject<boolean>(false);
  private readonly API : string = environment.apiGatewayUrl;
  private readonly GATEWAY : string = 'auth-service';
  private readonly CONTROLLER : string = 'Auth';
  private http = inject(HttpClient);

  public isAuthenticated$ = this._isAuth$.asObservable();

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
                        this._isAuth$.next(true);
                        localStorage.setItem('token', userResponse.tokenResponse.accessToken);
                        return userResponse;
                    }));
  }

  logout() {
    this._isAuth$.next(false);
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
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
