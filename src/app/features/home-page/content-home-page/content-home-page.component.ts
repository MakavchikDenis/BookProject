import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ContentConfigComponent } from '../content-config/content-config.component';
import { ContentConfig } from '../content-config';
import { Author } from '../../../shared/models/author';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { Service } from '../service';
import { ApiUrls } from '../../../shared/other/api-url';
import { Book } from '../../../shared/models/book';
import { AppSignalService } from '../../../core/services/app-signal.service';
import { MessageKind } from '../../../shared/other/messag-snack-bar';
import { map, Subscription, switchMap } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-content-home-page',
  imports: [ContentConfigComponent],
  templateUrl: './content-home-page.component.html',
  styleUrl: './content-home-page.component.scss'
})
export class ContentHomePageComponent implements OnInit {

  readonly httpService:ApiCoreService = inject(ApiCoreService);
  readonly appSignalService = inject (AppSignalService);

  //handlerService:Service = new Service(this.httpService,this.appSignalService);
  books=signal<Book[]>([]);
  authors=signal<string[]>([]);

  //первичная инициализация массивов
  ngOnInit(): void {
    this.httpService.getAllData(ApiUrls.bookStorage).pipe(map(x=>x)).subscribe({
        next:(x:any)=>{
          console.log(x)
          this.books.set(x["bookStorage"]);
          this.authors.set(this.books().flatMap<string>(x=>x.author))},
        error:(err)=>{
          console.log(err);
          this.appSignalService?.snackBar.set([MessageKind.Error]) 
          }
      })
  }

  //реализация запросов  на сервер через конфиг
  onChangeContent(config:[ContentConfig,string]){
    if(config[0]==ContentConfig.SelectAuthor){
      let params = new HttpParams().set("author",config[1]);
      this.httpService.getByCondition(ApiUrls.bookStorage,params).pipe(map(x=>x)).subscribe({
          next:(x:any)=>{
            console.log(x);
            this.books.set(x["bookStorage"])},
          error:(err)=>{
            console.log(err);
            this.appSignalService?.snackBar.set([MessageKind.Error]) 
          }
      })
    }
    else {
      let params = new HttpParams().set("userId",config[1]);
      let bookIdArray:string[] = [];
      //получаем данные по id книгам
      this.httpService.getByCondition(ApiUrls.preferBook,params)
        .pipe(map(x=>x.books))
        .subscribe({
          next:(x:any)=>{
            console.log(x)
            bookIdArray=x},
        error:(err)=>{
          console.log(err);
          this.appSignalService?.snackBar.set([MessageKind.Error]) 
        }
      });
      if(bookIdArray.length!=0){
        this.httpService.getAllData(ApiUrls.bookStorage)
          .pipe(x=>x)
          .subscribe({
            next:(x:any)=>{
              console.log(x);
              let array:Book[] = x["bookStorage"];
              this.books.set(array.forEach(x=>bookIdArray.find(z=>z==x.id))))
              },
            error:(err)=>{
              console.log(err);
              this.appSignalService?.snackBar.set([MessageKind.Error]) 
            }
        }) 
      }
    }
  }
}


