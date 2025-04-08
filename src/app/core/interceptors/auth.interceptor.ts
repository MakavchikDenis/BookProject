import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtTokenService } from '../services/jwt-token.service';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {

  jwtServoce = inject(JwtTokenService);

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem('token');

    if(jwt)

  }

};
