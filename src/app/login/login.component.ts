import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;
  auth2: any;
  constructor(public router: Router,
              public _usuarioservice: UsuarioService,
              public afAuth: AngularFireAuth) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email')  || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '609075969847-o39ca4idipdpbr2oq0jrgv00rost585a.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSingin(document.getElementById('btn-google'));
    });
  }
  attachSingin(element) {
  this.auth2.attachClickHandler(element, {}, googleUser => {
    // let profile = googleUser.getBasicProfile();
    let token = googleUser.getAuthResponse().id_token;
    this._usuarioservice.logingoogle(token).subscribe(() => {
   // console.log(resp);
   this.router.navigate(['/dashboard']);
    });
   // console.log("token ", token);
  } );
  }
  ingresar(forma: NgForm) {

  if ( forma.invalid) {
      return;
  }
  let usuario_nuevo =  new Usuario(
      null,
    forma.value.email,
    forma.value.password
  );
  console.log("usuario ", usuario_nuevo);

  this._usuarioservice.login(usuario_nuevo, forma.value.recuerdame)
              .subscribe(correcto => window.location.href = '#/dashboard' );

  }
  login() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((e: any) => {
      // console.log("ee ", e.credential.accessToken);
      this._usuarioservice.loginface(e.credential.accessToken).subscribe(() =>  window.location.href = '#/dashboard');

    });
    // this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
}
