import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private requestCount = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  show() {
    this.requestCount++;
    this.updateLoadingState();
  }

  hide() {
    this.requestCount--;
    this.updateLoadingState();
  }

  private updateLoadingState() {
    this.isLoadingSubject.next(this.requestCount > 0);
  }
}
