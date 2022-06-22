import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ResponseResult } from './models/response-result.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const customReq = request.clone({
  });
    return next.handle(customReq).pipe(tap((ev: HttpEvent<any>) => {
      console.log(customReq);
    }), catchError(response => {
                let respResult = new ResponseResult(200, "");
                console.error(response);
                if (response instanceof HttpErrorResponse) {
                    const err = response.message || JSON.stringify(response.error);
                    respResult.statusCode = response.status;
                    respResult.message = `${response.statusText || ''} Details: ${err}`;
                } else {
                    respResult.statusCode = 400
                    respResult.message = response.message ? response.message : response.toString();
                }
                console.error(respResult.message);
                return throwError(respResult);
    }));
  }
}
