import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '@env';
import { Observable } from 'rxjs';

@Injectable()
export class BaseURLInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: `${config.apiURL}/${req.url}`,
    });

    return next.handle(req);
  }
}
