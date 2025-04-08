import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Activity, GetFormUserService } from '../../../core/services/get-form-user.service';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccessAppButtonComponent } from '../../../shared/buttons/acces-app/access-app-button.component';
import { NgFor, NgIf } from '@angular/common';
import { AccessAppReferenceComponent } from '../../../shared/references/access-app-reference/access-app-reference.component';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { map, Subscription, switchMap } from 'rxjs';
import { User } from '../../../shared/models/user';
import { ApiUrls } from '../../../shared/other/api-url';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AccessAccountComponent } from '../access-account.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MessageValidDictionery } from '../../../shared/other/messag-valid-dictionery';
import { AppSignalService } from '../../../core/services/app-signal.service';
import { MessageKind } from '../../../shared/other/messag-snack-bar';
import { Preference } from '../../../shared/models/preference';


@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, AccessAppButtonComponent, NgFor, AccessAppReferenceComponent, MatFormFieldModule, MatInputModule, MatIconModule, NgIf,
    MatCardModule, MatChipsModule, MatProgressBarModule, MatCardModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnDestroy {

  readonly formService = inject(GetFormUserService);
  readonly routService = inject(Router);
  readonly httpService = inject(ApiCoreService);
  readonly appSignalService = inject(AppSignalService);
  subscription?: Subscription;

  //инициализация значений передываемых в children
  //контент для button
  buttonValue = "Sign Up";
  //контент и урл для link
  extraContentLink = "Exist account? ";
  contentLink = "Log In";
  urlLink = "/" + (this.routService.config.find(x => x.component == AccessAccountComponent)?.children?.find(x => x.component == SignInComponent)?.path ?? "");

  //свойства для template
  mainForm: FormGroup = this.formService.getFormField(Activity.Registration);
  hide = true;
  loginError = "";
  passwordError = "";
  emailError = "";


  //изменяем состояние icon password
  clickEvent() { this.hide = !this.hide; }

  //устанавливаем значение errorMessage
  setError(event: string) {
    switch (event) {
      case "Login": { this.loginError = this.mainForm.controls[event].hasError("required") ? MessageValidDictionery.getMessage("required", event) : ""; break; }
      case "Password": { this.passwordError = this.mainForm.controls[event].hasError("required") ? MessageValidDictionery.getMessage("required", event) : ""; break }
      case "Email": {
        if (this.mainForm.controls[event].hasError("required")) {
          this.emailError = MessageValidDictionery.getMessage("required", event);
        }
        else if (this.mainForm.controls[event].hasError("email")) {
          this.emailError = MessageValidDictionery.getMessage("format", event);
        }
      }
    }
  }

  //массив полей
  getFormFields(): string[] {
    return Object.keys(this.mainForm.controls);
  }


  //получаем данные формы, отправляем в апи и перенаправляем
  submit() {
    let user: User = {
      login: this.mainForm.controls["Login"].value,
      password: this.mainForm.controls["Password"].value,
      email: this.mainForm.controls["Email"].value
    };

    //первым запросам сохраняем обьект в таблицу user, 
    // вторым с его полученным  userId создаем новую сущность в таблице preferBook   
    this.subscription = this.httpService.addData(ApiUrls.users, JSON.stringify(user))
      .pipe(
        switchMap(x => {
          console.log(x);
          let preferBook: Preference = {
            books: [],
            userId: x
          };
          return this.httpService.addData(ApiUrls.preferBook, JSON.stringify(preferBook))
        }))
      .subscribe({
        next: (result) => {
          this.appSignalService.snackBar.set([MessageKind.Success]);
          this.routService.navigate([""]);
        },
        error: (error) => {
          console.log(error);
          this.appSignalService.snackBar.set([MessageKind.Error])
        }
      });
  };

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
