import { Component, inject, OnInit } from '@angular/core';
import { GetFormBookService } from '../../../core/services/get-form-book.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrls } from '../../../shared/other/api-url';
import { map } from 'rxjs';
import { AppSignalService } from '../../../core/services/app-signal.service';
import { MessageKind } from '../../../shared/other/messag-snack-bar';
import { Book } from '../../../shared/models/book';
import { Genre } from '../../../shared/models/genre';
import { AccessAppButtonComponent } from '../../../shared/buttons/acces-app/access-app-button.component';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookItemComponent } from '../../../shared/components/book-item/book-item.component';
import { MessageValidDictionery } from '../../../shared/other/messag-valid-dictionery';
import { ContentHomePageComponent } from '../../home-page/content-home-page/content-home-page.component';

@Component({
  selector: 'app-edit-item',
  imports: [ReactiveFormsModule, AccessAppButtonComponent, NgFor, MatFormFieldModule, MatInputModule, MatIconModule, NgIf,
    MatCardModule, MatChipsModule, MatProgressBarModule, MatCardModule, MatSelectModule, FormsModule, MatGridListModule],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss'
})
export class EditItemComponent implements OnInit {
  myForm: FormGroup = inject(GetFormBookService).getFormField();
  readonly apiService = inject(ApiCoreService);
  readonly router = inject(Router);
  readonly appSignalService: AppSignalService = inject(AppSignalService)
  routeParam: string = "";
  genres: Genre[] = [];
  //genresList: string[] = [];
  book: Book = { id: "", name: "", publishYear: "", genreKey: "", imgSrc: "", author: "" }

  publicYearError = "";
  anotherError = "";


  constructor(private route: ActivatedRoute) {
    route.params.subscribe(param => this.routeParam = param["id"]);
  }

  ngOnInit(): void {
    this.getItem(this.routeParam);
    this.getGenres();
  }

  private initItem(item: Book) {
    this.myForm.controls["Title"].setValue(item.name ?? "");
    this.myForm.controls["Author"].setValue(item.author ?? "");
    this.myForm.controls["Genre"].setValue(item.genreKey);
    this.myForm.controls["Publication Year"].setValue(item.publishYear);
  }


  private getItem(bookId: string) {
    this.apiService.getAllData(ApiUrls.bookStorage + "/" + this.routeParam).pipe(map(x => x)).subscribe({
      next: (x => {
        console.log(x);
        this.book = x;
        this.initItem(x);
      }),
      error: (err) => {
        console.log(err);
        this.appSignalService?.snackBar.set([MessageKind.Error])
      }
    })
  }

  private getGenres() {
    this.apiService.getAllData(ApiUrls.genres).pipe(map((x => x))).subscribe({
      next: (x => {
        console.log(x);
        this.genres = x;
        //(x as Genre[]).forEach(x => this.genresList.push(x.name));
      }),
      error: (err) => {
        console.log(err);
        this.appSignalService?.snackBar.set([MessageKind.Error])
      }
    })
  }

  //массив полей
  getFormFields(): string[] {
    return Object.keys(this.myForm.controls);
  }

  //устанавливаем значение errorMessage
  setError(event: string) {
    let controle = this.myForm.controls[event];
    if (controle.invalid) {
      if (event == "Publication Year") {
        if (controle.hasError("required")) {
          this.publicYearError = MessageValidDictionery.getMessage("required", event);
        }
        else {
          this.publicYearError = MessageValidDictionery.getMessage("format", event);
        }
      }
      else {
        this.anotherError = MessageValidDictionery.getMessage("required", event);
      }
    }
  }


  submit() {
    this.book.author = this.myForm.controls["Author"].value;
    this.book.name = this.myForm.controls["Title"].value;
    this.book.publishYear = this.myForm.controls["Publication Year"].value;
    this.book.genreKey = this.myForm.controls["Genre"].value;

    this.apiService.editData(ApiUrls.bookStorage + "/" + this.book.id, JSON.stringify(this.book)).pipe(x => x)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.appSignalService.snackBar.set([MessageKind.Success]);
          this.router.navigate([this.router.config.find(x=>x.component==ContentHomePageComponent)?.path]);
        },
        error: (error) => {
          console.log(error);
          this.appSignalService.snackBar.set([MessageKind.Error])
        }
      });
  }
}
