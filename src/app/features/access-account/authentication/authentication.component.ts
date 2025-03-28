import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Activity, GetFormUserService } from '../../../core/services/get-form-user.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccessAppButtonComponent } from '../../../shared/buttons/acces-app/access-app-button.component';

@Component({
  selector: 'app-authentication',
  imports: [ReactiveFormsModule,AccessAppButtonComponent,NgFor],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {

  readonly service = inject(GetFormUserService)
  mainForm:FormGroup = this.service.getFormField(Activity.Authentication);

  //массив полей
  getFormFields(): string[]{
    return Object.keys(this.mainForm.controls);
  }

  //получаем данные формы
  submit(){};
}
