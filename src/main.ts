import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule)]
})
  .catch(err => console.error(err));
