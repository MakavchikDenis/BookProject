import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ContentConfigComponent } from '../content-config/content-config.component';
import { ContentConfig, SortKind } from '../content-config';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { Service } from '../service';
import { ApiUrls } from '../../../shared/other/api-url';
import { Book } from '../../../shared/models/book';
import { AppSignalService } from '../../../core/services/app-signal.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookItemComponent } from '../../../shared/components/book-item/book-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EditItemComponent } from '../../edit-item/edit-item/edit-item.component';
import { UserStateService } from '../../../core/services/user-state.service';



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
  userStateService = inject(UserStateService);
  handlerService: Service = new Service(this.httpService, this.appSignalService);
  books = signal<Book[]>([]);
  authors = signal<string[]>([]);
  

  //инициализация сигналов из сервиса 
  ngOnInit(): void {
    this.handlerService.BaseRequest(this.books, this.authors, this.userStateService.userId());
  }

  //реализация фильтров на сервер через конфиг
  onChangeContent(config: [ContentConfig, string]) {
    //запрос по автору либо по названию (searchfield content)
    // если config[1] = "" (default)=> выводим все книги
    if (config[1] == "") {
      this.handlerService.BaseRequest(this.books, this.authors,this.userStateService.userId());
    }
    else if (config[0] != ContentConfig.OnlyFavorites) {
      this.handlerService.RequestWithParamExtension(
        config[0] == ContentConfig.SelectAuthor ? ["author", config[1]] : ["name", config[1]],
        this.books,
        this.userStateService.userId()
      )
    }
    //запрос на пользовательские книги
    else if (config[0] == ContentConfig.OnlyFavorites) {
      this.handlerService.UserPreferencesRequest(this.books, this.userStateService.userId())
    }
    else {
      this.handlerService.BaseRequest(this.books, this.authors);
    }
  }

  //удаление и добавление пользовательских книг 
  onChangeStatusBook(event: [boolean, string]) {
    this.handlerService.UpdatePreferencesRequest(event[0], event[1], this.books, this.authors,this.userStateService.userId());
  }

  //реализация сортировок 
  onSorting(event: SortKind) {
    if (SortKind.None) {
      this.handlerService.BaseRequest(this.books, this.authors, this.userStateService.userId());
      return;
    }
    this.handlerService.RequestWithParamExtension(["_sort", event == SortKind.Name ? "name" : "publishYear"], this.books, this.userStateService.userId());
  }

  //редактирование и удаление сущностей
  bookOperation(event: [boolean, string]) {
    // редактирование
    if (event[0] == true) {
      this.router.navigate([this.router.config.find(x => x.component == EditItemComponent)?.path?.replace(":id", ""), event[1]]);
    }
    else {
      if (confirm("Are you sure?")) {
        this.handlerService.DeleteItemRequest(event[1], this.books, this.authors, this.userStateService.userId());
      }
    }
  }
}

