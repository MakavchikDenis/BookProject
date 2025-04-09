import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { WrapperRequestService } from '../services/wrapper-request.service';

export class AuthInterceptor implements HttpInterceptor {

  jwtService = inject(JwtService);
  requestService =inject(WrapperRequestService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem('token');

    let verifyResult = this.jwtService.checkToken(token ?? "");

    if (verifyResult[0]) {

      console.log(verifyResult[1]);

      let payload = (verifyResult[1] as JwtPayload);

      const request=req.clone({
        headers:req.headers.set("id",payload["id"])
      })
      
      this.requestService.httpRequest=request;

      return next.handle(request);
    }
    return next.handle(req);
  }
};
