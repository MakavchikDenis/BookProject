import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app-routes';
import { HttpClient } from '@angular/common/http';



bootstrapApplication(AppComponent,AppRoutes)
  .catch(err => console.error(err));
