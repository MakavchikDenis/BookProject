import { Component, inject, OnDestroy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Activity, GetFormUserService } from '../../../core/services/get-form-user.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccessAppButtonComponent } from '../../../shared/buttons/acces-app/access-app-button.component';
import { AccessAppReferenceComponent } from '../../../shared/references/access-app-reference/access-app-reference.component';
import { Router } from '@angular/router';
import { AccessAccountComponent } from '../access-account.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { AppSignalService } from '../../../core/services/app-signal.service';
import { Subscription } from 'rxjs';
import { MessageValidDictionery } from '../../../shared/other/messag-valid-dictionery';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpParams } from '@angular/common/http';
import { ApiUrls } from '../../../shared/other/api-url';
import { User } from '../../../shared/models/user';
import { MessageKind } from '../../../shared/other/messag-snack-bar';


@Component({
  selector: 'app-authentication',
  imports: [ReactiveFormsModule,AccessAppButtonComponent,NgFor, AccessAppReferenceComponent,MatFormFieldModule, MatInputModule, MatIconModule, NgIf,
    MatCardModule, MatChipsModule, MatProgressBarModule, MatCardModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnDestroy {

  readonly service = inject(GetFormUserService);
  readonly routService = inject(Router);
  readonly httpService = inject(ApiCoreService);
  readonly appSignalService = inject (AppSignalService);
  private subscription?:Subscription;
  userData?:User;

  //контент для button
  buttonValue ="Log In";
  //контент и урл для link
  extraContentLink = "Need to create an account? ";
  contentLink = "Sign Up";
  urlLink = "/"+(this.routService.config.find(x=>x.component==AccessAccountComponent)?.children?.find(x=>x.component==SignUpComponent)?.path ?? "");
  

  //свойства для template
  mainForm:FormGroup = this.service.getFormField(Activity.Authentication);
  passwordError="";
  emailError="";
  hide=true;

  //устанавливаем значение errorMessage
    setError(event:string){
      switch (event) {
        case "Password":{this.passwordError = this.mainForm.controls[event].hasError("required") ? MessageValidDictionery.getMessage("required",event) : "";break}
        case "Email":{
          if(this.mainForm.controls[event].hasError("required")){
            this.emailError = MessageValidDictionery.getMessage("required",event);
            }
          else if(this.mainForm.controls[event].hasError("email")){
            this.emailError = MessageValidDictionery.getMessage("email",event);
            }
          }  
        }
      }

  //изменяем состояние icon password
  clickEvent(){this.hide=!this.hide;}

  //массив полей
  getFormFields(): string[]{
    return Object.keys(this.mainForm.controls);
  }

  //получаем данные формы, проверяем со значениями из АПИ: success => создаем jwt token, перенаправляем => home.
  submit(){
    let params = new HttpParams().set("email",this.mainForm.controls["Email"].value).set("password", this.mainForm.controls["Password"].value);

    this.httpService.getByCondition(ApiUrls.users,params).subscribe({
      next:(data:any)=>{
        this.userData={id:data.id,login:data.login, password:data.password,email:data.email}
      },
      error:(error)=>{
        console.log(error);
        this.appSignalService.snackBar.set([MessageKind.Error])
      }
    })
  };

   // отписываемся от Observable
   ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
