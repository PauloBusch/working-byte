import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        public snackBar: MatSnackBar
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getAccessToken();
    const headers = req.headers
        .set('access-token', token);

    const authReq = req.clone({ headers });

    return next.handle(authReq)
    .pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401){
            this.snackBar.open('Sua sessão expirou. Faça login novamente.', 'OK', { duration: 3000 });
        }
        return throwError(err);
      })
    );
  }
}