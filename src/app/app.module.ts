

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// modulos
import { PageModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


import { APP_ROUTES } from './app.routes';
// import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';
import { IncrementadorComponent } from './components/incrementador/incrementador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SettingsService } from './services/service.index';
import { ServiceModule } from './services/service.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { ImagenPipe } from './pipes/imagen.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    // IncrementadorComponent
    ,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PageModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    // AngularFireAuth
  ],
  providers: [
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
