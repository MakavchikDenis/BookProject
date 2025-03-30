import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class ApiCoreService {

  constructor(private http:HttpClient) { }

  //возвращаем все сущности
  getAllData(requestUrl:string):Observable<any>{
    return this.http.get(requestUrl)
  };
  
  //возвращаем сущность по Id
  getEntity(requestUrl:string, id:number):Observable<any>{
    return this.http.get(requestUrl+"/"+id);
  }

  //возвращаем сущност по условию
  getByCondition<T>(requestUrl:string,params:HttpParams):Observable<T>{
    return this.http.get<T>(requestUrl,{params});
  }

  //добавляем сущеность
  addData(requestUri:string, body:string):Observable<string>{
   return this.http.post<string>(requestUri,body)
  };

  // обновляем сущность
  editData(requestUrl:string,body:string):Observable<string>{
    return this.http.put<string>(requestUrl,body)
  };

  //удаляем сущность
  deleteData(requestUrl:string, id:number):Observable<string>{
    return this.http.delete<string>(requestUrl+'/'+id);
  };
}
