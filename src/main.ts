import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app-routes';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { RouterLink } from '@angular/router';



bootstrapApplication(AppComponent,AppRoutes)
  .catch(err => console.error(err));
