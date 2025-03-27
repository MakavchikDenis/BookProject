import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig } from "@angular/core";
import { HomeComponent } from "./features/home/home.component";


const routes:Routes = [
    {path:"", component:HomeComponent},
    {path:"**", redirectTo:"/"}
]

export const AppRoutes:ApplicationConfig = {
    providers: [
        provideRouter(routes)
    ]
}
