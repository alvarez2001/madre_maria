import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError, Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from '../shared/shared.service';
import { LoginService } from '../login/login.service';

@Injectable()
export class InterceptorPrimary implements HttpInterceptor {
  constructor(private sharedSvc: SharedService, private loginSvc:LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const accessToken = this.loginSvc.regresarToken();

    if (accessToken) {
      const request = this.addToken(req, accessToken);
      return next.handle(request).pipe(catchError((err) => this.manejarErrores(err)));
    }



    return next.handle(req).pipe(catchError((err) => this.manejarErrores(err)));
  }


  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  private manejarErrores(err: HttpErrorResponse) {
    this.sharedSvc.lanzarCarga(false);
    if (err.status !== 500 && err.status !== 0 && err.status !== 401) {
      this.sharedSvc.mostrarAlertaError(err);
      console.log(err);
      return throwError('error de validacion');
    } else if (err.status === 401) {
      console.log('error 401 ->', err);
      return throwError(`no estas autentificado`);
    }
    return throwError(err);
  }
}
