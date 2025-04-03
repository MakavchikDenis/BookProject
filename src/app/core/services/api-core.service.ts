import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiCoreService {

  constructor(private http:HttpClient) { }

  //возвращаем все сущности
  getAllData(requestUrl:string):Observable<any>{
    return this.http.get(requestUrl)
  };
  
  //возвращаем сущность по Id
  getEntity<T>(requestUrl:string, id:number):Observable<T>{
    return this.http.get<T>(requestUrl+"/"+id);
  }

  //возвращаем сущности по условию
  getByCondition(requestUrl:string,_params:HttpParams):Observable<any>{
    return this.http.get(requestUrl, {params:_params});
  }

  //добавляем сущность
  addData(requestUri:string, body:string):Observable<any>{
   return this.http.post(requestUri,body)
  };

  // обновляем сущность
  editData(requestUrl:string,body:string):Observable<any>{
    return this.http.put(requestUrl,body)
  };

  //удаляем сущность
  deleteData(requestUrl:string, id:number):Observable<any>{
    return this.http.delete(requestUrl+'/'+id);
  };
}
