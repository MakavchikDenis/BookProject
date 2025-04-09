import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { LogIn } from '../../shared/models/logIn';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }

  decodeToken(token: string) {
    let res = jwtDecode(token);
    console.log(res);
    return res.sub;
  }
}
