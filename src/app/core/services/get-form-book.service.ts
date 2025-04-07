import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class GetFormBookService {

  readonly formBuilder = inject(FormBuilder);
  constructor() { }

  getFormField(): FormGroup {
    return this.formBuilder.group({
      "Title": ["", [Validators.required, Validators.min(3)]],
      "Author": ["", [Validators.required]],
      "Genre": ["", [Validators.required]],
      "Publication Year": ["", [Validators.required]]
    })
  }
}
