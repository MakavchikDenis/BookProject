import { Component, inject, OnDestroy, signal} from '@angular/core';
import { Activity, GetFormUserService } from '../../../core/services/get-form-user.service';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AccessAppButtonComponent } from '../../../shared/buttons/acces-app/access-app-button.component';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AccessAppReferenceComponent } from '../../../shared/references/access-app-reference/access-app-reference.component';
import { ApiCoreService } from '../../../core/services/api-core.service';
import {  Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { ApiUrls } from '../../../api-url';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule,AccessAppButtonComponent,NgFor, AccessAppReferenceComponent,MatFormFieldModule, MatInputModule, MatIconModule,
    NgSwitch, NgSwitchCase],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnDestroy  {

    readonly formService = inject(GetFormUserService);
    readonly routService = inject(Router);
    readonly httpService = inject(ApiCoreService);
    private subscription?:Subscription;
    
    hide = signal(true);
    mainForm:FormGroup = this.formService.getFormField(Activity.Registration);
  
    //контент для button
    buttonValue ="Sign Up";
    //контент и урл для link
    extraContentLink = "Exist account? ";
    contentLink = "Log In";
    urlLink = "/"+(this.routService.config.find(x=>x.children)?.children?.find(x=>x.component==AuthenticationComponent)?.path ?? "");
     
    clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
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
