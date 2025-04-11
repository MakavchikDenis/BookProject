import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Injectable()
export class GetFormBookService {

  readonly formBuilder = inject(FormBuilder);
  constructor() { }

  getFormField(): FormGroup {
    return this.formBuilder.group({
      "Title": ["", [Validators.required, Validators.min(3)]],
      "Author": ["", [Validators.required]],
      "Genre": ["", [Validators.required]],
      "Publication Year": ["", [Validators.pattern("[0-9]{4}"), Validators.min(1945), Validators.max(new Date().getFullYear())]]
    })
  }
}
