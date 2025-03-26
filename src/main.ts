import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/features/auth/app-routes';


bootstrapApplication(AppComponent, AppRoutes)
  .catch(err => console.error(err));
