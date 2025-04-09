import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WrapperRequestService {

  httpRequest?:HttpRequest<any>
  constructor() { }

}
