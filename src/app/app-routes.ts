import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig } from "@angular/core";
import { AccessAccountComponent } from "./features/access-account/access-account.component";
import { provideHttpClient } from "@angular/common/http";
import { SignInComponent } from "./features/access-account/sign-in/sign-in.component";
import { SignUpComponent } from "./features/access-account/sign-up/sign-up.component";


const childAccessRoutes:Routes=[
    {path:"", component:SignInComponent},
    {path:"reg", component:SignUpComponent}
]

const generalRoutes:Routes = [
    {path:"", component:AccessAccountComponent, children:childAccessRoutes},
    {path:"**", redirectTo:"/"}
]

export const AppRoutes:ApplicationConfig = {
    providers: [
        provideRouter(generalRoutes),
        provideHttpClient()
    ]
}
