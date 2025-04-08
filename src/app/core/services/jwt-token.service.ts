import { Injectable } from '@angular/core';

const key: string = "angular";
const algoritm: string = '256';
const jwt = require('jsonwebtoken');


@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

  getToken(userName: string, userId: string): string | undefined {
    let payload = {
      userId: userId,
      userName: userName,
      exp: "1h"
    }
    try {
      return jwt.sign(payload, key, { algoritm: algoritm });
    }
    catch (err) {
      console.log(err);
      return undefined
    }
  }

  verify(token: string): [boolean, string | undefined] {
    try {
      return [true, jwt.verify(token, key)];
    }
    catch (err) {
      console.log(err);
      return [false,undefined]
    }
  }
}
