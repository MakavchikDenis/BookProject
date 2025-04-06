import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ContentConfigComponent } from '../content-config/content-config.component';
import { ContentConfig } from '../content-config';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { Service } from '../service';
import { ApiUrls } from '../../../shared/other/api-url';
import { Book } from '../../../shared/models/book';
import { AppSignalService } from '../../../core/services/app-signal.service';
import { Preference } from '../../../shared/models/preference';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgFor } from '@angular/common';
import { BookItemComponent } from '../../../shared/components/book-item/book-item.component';


@Component({
  selector: 'app-content-home-page',
  imports: [ContentConfigComponent,MatGridListModule, BookItemComponent],
  templateUrl: './content-home-page.component.html',
  styleUrl: './content-home-page.component.scss'
})
export class ContentHomePageComponent implements OnInit {

  readonly httpService: ApiCoreService = inject(ApiCoreService);
  readonly appSignalService = inject(AppSignalService);

  handlerService: Service = new Service(this.httpService, this.appSignalService);
  books = signal<Book[]>([]);
  authors = signal<string[]>([]);
  nameBooks = signal<string[]>([]);

  preferencesUser?:Preference

  //инициализация сигналов из сервиса 
  ngOnInit(): void {
    
    this.handlerService.BaseRequest(ApiUrls.preferBook, ApiUrls.bookStorage, this.books, this.authors,this.nameBooks);
    
  }


  //реализация запросов на сервер через конфиг
  onChangeContent(config: [ContentConfig, string]) {
    //запрос по автору либо по названию (searchfield content)
    // если config[1] = "" (default)=> выводим все книги
    if (config[1] == "") {
      this.handlerService.BaseRequest(ApiUrls.preferBook, ApiUrls.bookStorage, this.books, this.authors,this.nameBooks);
    }
    else if (config[0] != ContentConfig.OnlyFavorites) {
      this.handlerService.RequestWithParamExtension(
        ApiUrls.preferBook,
        ApiUrls.bookStorage,
        config[0] == ContentConfig.SelectAuthor ? ["author", config[1]] : ["name", config[1]],
        this.books,
        "2"
      )
    }
    //запрос на пользовательские книги
    else if (config[0] == ContentConfig.OnlyFavorites) {
      this.handlerService.UserPreferencesRequest(
        ApiUrls.preferBook,
        ApiUrls.bookStorage,
        this.books,
        "2"
      )
    }
    else {   
      this.handlerService.BaseRequest(ApiUrls.preferBook, ApiUrls.bookStorage, this.books, this.authors,this.nameBooks);
    }
  }
}

