import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '@core/stores/app.state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class AuthHeaderInceptor implements HttpInterceptor {
  private storeSubscriber: Subscription;
  private authToken: string;

  constructor(store: Store<AppState>) {
    this.storeSubscriber = store.select('user').subscribe(userState => {
      this.authToken = userState.authToken;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
    }

    return next.handle(req);
  }
}
