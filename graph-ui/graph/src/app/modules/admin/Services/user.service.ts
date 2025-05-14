import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API : string = environment.apiGatewayUrl;
  private readonly GATEWAY : string = 'graph-service';
  private readonly CONTROLLER : string = 'User';
  private http = inject(HttpClient);

  getByUserId(UserId: string): Observable<User> {   
    const url = `${this.API}/${this.GATEWAY}/${this.CONTROLLER}/GetByUserId/?UserId=${UserId}`; 
    return this.http.get<User>(url)
                    .pipe(
                      catchError(this.handleError<User>('getByUserId', null!)),
                      map((userResponse : User) => {
                        return userResponse;
                    }));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
