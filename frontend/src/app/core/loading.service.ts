import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/**
 * Service to controls the global loading indicator.
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private count = 0;
  private _loading$ = new ReplaySubject<boolean>(1);
  loading$ = this._loading$.asObservable();

  show(): void {
    this.count++;
    if (this.count > 0) {
      this._loading$.next(true);
    }
  }

  hide(): void {
    this.count--;
    if (this.count <= 0) {
      this.count = 0;
      this._loading$.next(false);
    }
  }

}