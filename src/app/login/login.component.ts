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
  constructor(public router: Router,
              public usuario: UsuarioService) { }

  ngOnInit() {
    init_plugins();

  }

  ingresar(forma: NgForm) {
  // this.router.navigate(['/dashboard']);
  // console.log("valida ", forma.valid);
  // console.log("value ", forma.value);
  if ( forma.invalid) {
      return;
  }
  let usuario =  new Usuario(
    null,
    forma.value.email,
    forma.value.password
  );
  this.usuario.login(usuario, forma.value.recuerdame)
              .subscribe(resp => {
                console.log("la resp ", resp);
              });
  }
}
