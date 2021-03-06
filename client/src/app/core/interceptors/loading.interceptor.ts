import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {delay, finalize} from 'rxjs/operators';
import {BusyService} from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('EmailExists')) {
      this.busyService.busy();
    }
    return next.handle(request).pipe(
      delay(environment?.apiDelayMilliseconds ?? 0),
      finalize(() => {
        this.busyService.idle();
      })
    );
  }
}
