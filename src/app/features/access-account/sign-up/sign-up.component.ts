import { Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { Activity, GetFormUserService } from '../../../core/services/get-form-user.service';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccessAppButtonComponent } from '../../../shared/buttons/acces-app/access-app-button.component';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AccessAppReferenceComponent } from '../../../shared/references/access-app-reference/access-app-reference.component';
import { ApiCoreService } from '../../../core/services/api-core.service';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { ApiUrls } from '../../../api-url';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AccessAccountComponent } from '../access-account.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule,AccessAppButtonComponent,NgFor, AccessAppReferenceComponent,MatFormFieldModule, MatInputModule, MatIconModule, NgIf,
    MatCardModule, MatChipsModule, MatProgressBarModule, MatCardModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements  OnDestroy  {

    readonly formService = inject(GetFormUserService);
    readonly routService = inject(Router);
    readonly httpService = inject(ApiCoreService);
    private subscription?:Subscription;
    
    //инициализация значений передываемых в children
    //контент для button
    buttonValue ="Sign Up";
    //контент и урл для link
    extraContentLink = "Exist account? ";
    contentLink = "Log In";
    urlLink = "/"+(this.routService.config.find(x=>x.component==AccessAccountComponent)?.children?.find(x=>x.component==SignInComponent)?.path ?? "");
    
    //свойства для template
    mainForm:FormGroup = this.formService.getFormField(Activity.Registration);
    hide=true;
    commonErrorMessage = "";

    //изменяем состояние password
    clickEvent(){this.hide=!this.hide;}
  
    //устанавливаем значение errorMessage
    setError(event:string){
      if(event=='Email'){
        let a = this.mainForm.controls[event].hasError('email');
        this.commonErrorMessage = this.mainForm.controls[event].hasError('email') ? "Not a valid email" : "";
        return;
      }
        this.commonErrorMessage = this.mainForm.controls[event].hasError('required') ? "You must enter a value": "";
    }

    //массив полей
    getFormFields(): string[]{
      return Object.keys(this.mainForm.controls);
    }

    
    //получаем данные формы, отправляем в апи
    submit(){
       let user:User ={
        login:this.mainForm.controls["Login"].value,
        password:this.mainForm.controls["Password"].value,
        email:this.mainForm.controls["Email"].value  
       };
       
       this.subscription = this.httpService.addData(ApiUrls.users, JSON.stringify(user)).subscribe({
        next:(result)=>console.log(result),
        error:(error)=>{
          console.log(error);
        }
       });

    };

    // отписываемся от Observable
    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }
}
