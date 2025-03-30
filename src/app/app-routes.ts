import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig } from "@angular/core";
import { AccessAccountComponent } from "./features/access-account/access-account.component";
import { AuthenticationComponent } from "./features/access-account/authentication/authentication.component";
import { RegistrationComponent } from "./features/access-account/registration/registration.component";
import { provideHttpClient } from "@angular/common/http";


const childAccessRoutes:Routes=[
    {path:"", component:AuthenticationComponent},
    {path:"reg", component:RegistrationComponent}
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
