import { Component, inject, OnDestroy} from '@angular/core';
import { Activity, GetFormUserService } from '../../../core/services/get-form-user.service';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AccessAppButtonComponent } from '../../../shared/buttons/acces-app/access-app-button.component';
import { NgFor } from '@angular/common';
import { AccessAppReferenceComponent } from '../../../shared/references/access-app-reference/access-app-reference.component';
import { ApiCoreService } from '../../../core/services/api-core.service';
import {  Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { ApiUrls } from '../../../api-url';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule,AccessAppButtonComponent,NgFor, AccessAppReferenceComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnDestroy {

    readonly formService = inject(GetFormUserService);
    readonly routService = inject(Router);
    readonly httpService = inject(ApiCoreService);
    private subscription?:Subscription;
    users?:User[];

    mainForm:FormGroup = this.formService.getFormField(Activity.Registration);
  
    //контент для button
    buttonValue ="Sign Up";
    //контент и урл для link
    extraContentLink = "Exist account? ";
    contentLink = "Log In";
    urlLink = "/"+(this.routService.config.find(x=>x.children)?.children?.find(x=>x.component==AuthenticationComponent)?.path ?? "");
    
    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }

    //массив полей
    getFormFields(): string[]{
      return Object.keys(this.mainForm.controls);
    }

    //получаем данные формы, отправляем в апи, отписываемся от Observable
    submit(){
       let user:User ={
        login:this.mainForm.controls["Login"].value,
        password:this.mainForm.controls["Password"].value,
        email:this.mainForm.controls["Email"].value  
       };
       
       let a = ApiUrls.users;
       let z = JSON.stringify(user);
       this.subscription = this.httpService.getAllData(ApiUrls.users).subscribe( 
        {next:(x:any)=>console.log(x),
        error:(e)=>console.log(e)
        },
        
       )
      //  this.subscription = this.httpService.addData(ApiUrls.users, JSON.stringify(user)).subscribe(
      //   {
      //     next(value) {
      //       console.log(value);
      //     },
      //     error(e){
      //       console.log(e);
      //     }
      //   }
      // 
      
    };
}
