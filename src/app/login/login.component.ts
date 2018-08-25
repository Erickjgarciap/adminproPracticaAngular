import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../../models/usuario.model';
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;
  constructor(public router: Router,
              public _usuarioservice: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email')  || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
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
              .subscribe(correcto => this.router.navigate(['/dashboard']) );

  }
}
