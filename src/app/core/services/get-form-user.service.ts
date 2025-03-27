import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user';
import {FormBuilder,FormGroup, FormControl, Validators,} from '@angular/forms';

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
        "Email": ["", [Validators.required, Validators.email]],
        "Password":["",[Validators.required],] 
      })
    };   
      return this.formBuilder.group({
        "Login":["", [Validators.required, Validators.min(10)]],
        "Password":["",Validators.required],
        "Email":["",Validators.required]
      })
  } 
}
