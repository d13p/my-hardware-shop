import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';

import { delay, finalize, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private loading: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneReq = req.clone({
      url: `api/v1/${req.url}`
    });
    this.loading.show();
    return next.handle(cloneReq).pipe(
      delay(300), // simulate a normal network
      finalize(() => this.loading.hide())
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
];