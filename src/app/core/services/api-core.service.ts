import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from '../../shared/models/user';

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

  //возвращаем сущности по условию (Get)
  getByCondition(requestUrl:string,_params:HttpParams):Observable<any>{
    return this.http.get(requestUrl, {params:_params});
  }

  //возвращаем сущности по условию (Post)
  accessRequest(requestUrl:string,body:any):Observable<any>{
    return this.http.post(requestUrl,body);
  }

  //добавляем сущность
  addData(requestUri:string, body:any):Observable<any>{
   return this.http.post(requestUri,body)
  };

  // обновляем сущность
  editData(requestUrl:string,body:any):Observable<any>{
    return this.http.put(requestUrl,body)
  };

  //удаляем сущность
  deleteData(requestUrl:string, id:string):Observable<any>{
    return this.http.delete(requestUrl+'/'+id);
  };
}
