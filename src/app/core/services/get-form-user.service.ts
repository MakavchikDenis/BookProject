import { inject, Injectable } from '@angular/core';
import {FormBuilder,FormGroup, Validators,} from '@angular/forms';

export enum Activity  
{
  Authentication,
  Registration
}

@Injectable()
export class GetFormUserService {

  readonly formBuilder =inject(FormBuilder);
  constructor() { }

  getFormField(kindOfActiv:Activity):FormGroup {

    if(kindOfActiv == Activity.Authentication){
      return this.formBuilder.group({
        "Email": ["", [Validators.required]],
        "Password":["",[Validators.required]] 
      })
    };   
      return this.formBuilder.group({
        "Login":["", [Validators.required, Validators.min(3)]],
        "Password":["",[Validators.required, Validators.min(3)]],
        "Email":["",[Validators.required, Validators.min(3),Validators.email]]
      })
  } 
}
