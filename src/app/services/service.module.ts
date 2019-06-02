import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { AngularFireModule } from 'angularfire2';

import {
  SharedService,
  SidebarService,
  SettingsService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService,
  HospitalesService,
  MedicoService
} from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

export const  config = {
  apiKey: "AIzaSyA0bYNeysCFKObhl_yue_fekr2IOeiuml4",
  authDomain: "firechat-54667.firebaseapp.com",
  databaseURL: "https://firechat-54667.firebaseio.com",
  projectId: "firechat-54667",
  storageBucket: "firechat-54667.appspot.com",
  messagingSenderId: "460616903574"
};
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
   // AngularFireAuth
   // auth
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalesService,
    MedicoService
  ]
})
export class ServiceModule { }
