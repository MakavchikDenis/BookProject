import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ContentConfigComponent } from '../content-config/content-config.component';
import { ContentConfig, SortKind } from '../content-config';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { Service } from '../service';
import { ApiUrls } from '../../../shared/other/api-url';
import { Book } from '../../../shared/models/book';
import { AppSignalService } from '../../../core/services/app-signal.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookItemComponent } from '../../../shared/components/book-item/book-item.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-content-home-page',
  imports: [ContentConfigComponent, MatGridListModule, BookItemComponent],
  templateUrl: './content-home-page.component.html',
  styleUrl: './content-home-page.component.scss'
})
export class ContentHomePageComponent implements OnInit {

  readonly httpService: ApiCoreService = inject(ApiCoreService);
  readonly appSignalService = inject(AppSignalService);
  readonly router = inject(Router);

  handlerService: Service = new Service(this.httpService, this.appSignalService);
  books = signal<Book[]>([]);
  authors = signal<string[]>([]);


  //preferencesUser:Preference={id:"", books:[], userId:""}

  //инициализация сигналов из сервиса 
  ngOnInit(): void {
    this.handlerService.BaseRequest(ApiUrls.preferBook, ApiUrls.bookStorage, this.books, this.authors);
  }


  //реализация фильтров на сервер через конфиг
  onChangeContent(config: [ContentConfig, string]) {
    //запрос по автору либо по названию (searchfield content)
    // если config[1] = "" (default)=> выводим все книги
    if (config[1] == "") {
      this.handlerService.BaseRequest(ApiUrls.preferBook, ApiUrls.bookStorage, this.books, this.authors);
    }
    else if (config[0] != ContentConfig.OnlyFavorites) {
      this.handlerService.RequestWithParamExtension(
        ApiUrls.preferBook,
        ApiUrls.bookStorage,
        config[0] == ContentConfig.SelectAuthor ? ["author", config[1]] : ["name", config[1]],
        this.books,
        "1"
      )
    }
    //запрос на пользовательские книги
    else if (config[0] == ContentConfig.OnlyFavorites) {
      this.handlerService.UserPreferencesRequest(
        ApiUrls.preferBook,
        ApiUrls.bookStorage,
        this.books,
        "1"
      )
    }
    else {
      this.handlerService.BaseRequest(ApiUrls.preferBook, ApiUrls.bookStorage, this.books, this.authors);
    }
  }

  //удаление и добавление пользовательских книг 
  onChangeStatusBook(event: [boolean, string]) {
    this.handlerService.UpdatePreferencesRequest(ApiUrls.preferBook, "1", event[0], event[1], this.books, this.authors);
  }

  //реализация сортировок 
  onSorting(event: SortKind) {
    if (SortKind.None) {
      this.handlerService.BaseRequest(ApiUrls.preferBook, ApiUrls.bookStorage, this.books, this.authors);
      return;
    }
    this.handlerService.RequestWithParamExtension(ApiUrls.preferBook, ApiUrls.bookStorage,
      ["_sort", event == SortKind.Name ? "name" : "publishYear"], this.books);
  }

  //редирект на страницу edit
  editItem(event:string){
    this.router.navigate(["edit", event]);
  }
}

