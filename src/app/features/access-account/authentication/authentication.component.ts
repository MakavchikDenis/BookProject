import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Activity, GetFormUserService } from '../../../core/services/get-form-user.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccessAppButtonComponent } from '../../../shared/buttons/acces-app/access-app-button.component';
import { AccessAppReferenceComponent } from '../../../shared/references/access-app-reference/access-app-reference.component';
import { AppRoutes } from '../../../app-routes';
import { Route, Router } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-authentication',
  imports: [ReactiveFormsModule,AccessAppButtonComponent,NgFor, AccessAppReferenceComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {

  readonly service = inject(GetFormUserService);
  readonly routService = inject(Router);

  mainForm:FormGroup = this.service.getFormField(Activity.Authentication);

  //контент для button
  buttonValue ="Log In";
  //контент и урл для link
  extraContentLink = "Need to create an account? ";
  contentLink = "Sign Up";
  urlLink = "/"+(this.routService.config.find(x=>x.children)?.children?.find(x=>x.component==RegistrationComponent)?.path ?? "");
  
  //массив полей
  getFormFields(): string[]{
    return Object.keys(this.mainForm.controls);
  }

  //получаем данные формы
  submit(){};
}
