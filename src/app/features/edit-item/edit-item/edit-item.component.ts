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
import { AccessAppReferenceComponent } from '../../../shared/references/access-app-reference/access-app-reference.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-item',
  imports: [ReactiveFormsModule, AccessAppButtonComponent, NgFor, MatFormFieldModule, MatInputModule, MatIconModule, NgIf,
    MatCardModule, MatChipsModule, MatProgressBarModule, MatCardModule, MatSelectModule, FormsModule],
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
  genresList: string[] = [];
  book: Book = { id: "", name: "", publishYear: "", genreKey: "", imgSrc: "", author: "" }

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(param => this.routeParam = param["id"]);
  }

  ngOnInit(): void {
    this.getItem(this.routeParam);
    this.getGenres();
    this.initItem();

  }

  private initItem() {
    this.myForm.controls["Title"].setValue(this.book?.name ?? "");
    this.myForm.controls["Author"].setValue(this.book?.author ?? "");
    this.myForm.controls["Genre"].setValue(this.book?.genreKey);
    this.myForm.controls["Publication Year"].setValue(this.book?.publishYear);
  }


  private getItem(bookId: string) {
    this.apiService.getAllData(ApiUrls.bookStorage).pipe(map(x => x)).subscribe({
      next: (x => {
        console.log(x);
        this.book = x
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
        this.getGenres = x;
        (x as Genre[]).forEach(x => this.genresList.push(x.name));
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

  submit() {
    this.book.author = this.myForm.controls["Author"].value;
    this.book.name = this.myForm.controls["Title"].value;
    this.book.publishYear = this.myForm.controls["Publication Year"].value;
    this.book.genreKey = this.genres.find(x => x.name == this.myForm.controls["Genre"].value)?.id ?? "";

    this.apiService.editData(ApiUrls.bookStorage + "/" + this.book.id, JSON.stringify(this.book)).pipe(x => x)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.appSignalService.snackBar.set([MessageKind.Success]);
          this.router.navigate(["home"]);
        },
        error: (error) => {
          console.log(error);
          this.appSignalService.snackBar.set([MessageKind.Error])
        }
      });
  }
}
