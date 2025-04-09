import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserStateService } from '../services/user-state.service';


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  let jwtService = inject(JwtService);
  let userStateService = inject(UserStateService);
  let token = localStorage.getItem('token');
  if (token != null) {
    console.log("Intersepter" + token);
    let userId = jwtService.decodeToken(token ?? "");
    console.log("Intersepter" + userId);
    userStateService.login(userId ??"");
  }
  return next(req);
}
