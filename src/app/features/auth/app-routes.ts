import { provideRouter, Routes } from "@angular/router";
import { AuthorizationComponent } from "./authorization.component";
import { AppComponent } from "../../app.component";
import { ApplicationConfig } from "@angular/core";

const routes:Routes = [
    {path:"", component:AuthorizationComponent},
    {path:"**", redirectTo:"/"}
]

export const AppRoutes:ApplicationConfig = {
    providers: [
        provideRouter(routes)
    ]
}
