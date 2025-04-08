import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig } from "@angular/core";
import { AccessAccountComponent } from "./features/access-account/access-account.component";
import { provideHttpClient } from "@angular/common/http";
import { SignInComponent } from "./features/access-account/sign-in/sign-in.component";
import { SignUpComponent } from "./features/access-account/sign-up/sign-up.component";
import { ContentHomePageComponent } from "./features/home-page/content-home-page/content-home-page.component";
import { EditItemComponent } from "./features/edit-item/edit-item/edit-item.component";


const childAccessRoutes:Routes=[
    {path:"", component:SignInComponent},
    {path:"reg", component:SignUpComponent}
]


const generalRoutes:Routes = [
    {path:"", component:AccessAccountComponent, children:childAccessRoutes},
    {path:"home", component:ContentHomePageComponent},
    {path:"edit/:id", component:EditItemComponent},
    {path:"**", redirectTo:"/"}
]

export const AppRoutes:ApplicationConfig = {
    providers: [
        provideRouter(generalRoutes),
        provideHttpClient()
    ]
}
