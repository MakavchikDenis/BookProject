import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetFormBookService } from '../../../core/services/get-form-book.service';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { Router } from '@angular/router';
import { AppSignalService } from '../../../core/services/app-signal.service';
import { Genre } from '../../../shared/models/genre';
import { ApiUrls } from '../../../shared/other/api-url';
import { map, Subscription } from 'rxjs';
import { MessageKind } from '../../../shared/other/messag-snack-bar';
import { Book } from '../../../shared/models/book';
import { ContentHomePageComponent } from '../../home-page/content-home-page/content-home-page.component';
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
import { MessageValidDictionery } from '../../../shared/other/messag-valid-dictionery';



// !!! Необходимо переписать в едный какой-то сервис вместе с Edit
// много повторяющегося
@Component({
  selector: 'app-add-item',
  imports: [ReactiveFormsModule, AccessAppButtonComponent, NgFor, MatFormFieldModule, MatInputModule, MatIconModule, NgIf,
    MatCardModule, MatChipsModule, MatProgressBarModule, MatCardModule, MatSelectModule, FormsModule, MatGridListModule],
  providers:[GetFormBookService],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent implements OnInit, OnDestroy {
  myForm: FormGroup = inject(GetFormBookService).getFormField();
  readonly apiService = inject(ApiCoreService);
  readonly router = inject(Router);
  readonly appSignalService: AppSignalService = inject(AppSignalService);
  genres: Genre[] = [];
  subscriptions: Subscription[] = [];

  publicYearError = "";
  anotherError = "";


  private getGenres() {
    this.subscriptions.push(this.apiService.getAllData(ApiUrls.genres).subscribe({
      next: (x => {
        console.log(x);
        this.genres = x;
      }),
      error: (err) => {
        console.log(err);
        this.appSignalService?.snackBar.set([MessageKind.Error])
      }
    }));
  }

  ngOnInit(): void {
    this.getGenres();
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

  onAdd() {
    let item: Book = {
      name: this.myForm.controls["Title"].value,
      author: this.myForm.controls["Author"].value,
      publishYear: this.myForm.controls["Publication Year"].value,
      genreKey: this.myForm.controls["Genre"].value,
      imgSrc: "/assets/imgs/not.png"
    }

    this.subscriptions.push(this.apiService.addData(ApiUrls.bookStorage, item)
      .subscribe({
        next: (x) => {
          console.log(x);
          this.appSignalService.snackBar.set([MessageKind.Success]);
          this.router.navigate([this.router.config.find(x => x.component == ContentHomePageComponent)?.path]);
        },
        error: (err) => {
          console.log(err);
          this.appSignalService.snackBar.set([MessageKind.Error])
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
