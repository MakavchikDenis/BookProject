import { Injectable } from '@angular/core';
import jwt, { JwtPayload } from 'jsonwebtoken';

const key="a-string-secret-at-least-256-bits-long";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }
  
  checkToken(token:string):[boolean, string|JwtPayload]{
    try{
     return [true, (jwt.verify(token,key) as string)]
    }
    catch(error){
      return[false, ""]
    }
  }

  check(token:string){
    
  }

}
