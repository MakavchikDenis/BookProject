import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig, Component } from "@angular/core";
import { AccessAccountComponent } from "./features/access-account/access-account.component";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from "@angular/common/http";
import { SignInComponent } from "./features/access-account/sign-in/sign-in.component";
import { SignUpComponent } from "./features/access-account/sign-up/sign-up.component";
import { ContentHomePageComponent } from "./features/home-page/content-home-page/content-home-page.component";
import { EditItemComponent } from "./features/edit-item/edit-item/edit-item.component";
import { AddItemComponent } from "./features/add-item/add-item/add-item.component";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { isloggedIn } from "./core/guards/guards";
import { SignOutComponent } from "./features/access-account/sign-out/sign-out.component";
import { NotFoundComponent } from "./features/not-found/not-found.component";


const childAccessRoutes:Routes=[
    {path:"", component:SignInComponent},
    {path:"reg", component:SignUpComponent}
]


const generalRoutes:Routes = [
    {path:"access", component:AccessAccountComponent, children:childAccessRoutes},
    {path:"logout", component:SignOutComponent},
    {path:"edit/:id", component:EditItemComponent, canActivate:[isloggedIn]},
    {path:"add", component:AddItemComponent, canActivate:[isloggedIn]},
    {path:"", component:ContentHomePageComponent},
    {path:"**", component:NotFoundComponent}
]

export const AppRoutes:ApplicationConfig = {
    providers: [
        provideRouter(generalRoutes),
        provideHttpClient(),
        provideHttpClient(withInterceptors([AuthInterceptor]))
    ]
}
