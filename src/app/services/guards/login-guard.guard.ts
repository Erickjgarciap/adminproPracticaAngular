import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioservice: UsuarioService,
              public _router: Router ) {

  }
  canActivate() {
   // console.log("Paso por el ward :v");
    if (this._usuarioservice.estaLogueado()) {
     // console.log("paso el logueo");
      return true;
    } else {
      // console.log("bloqueado");
      this._router.navigate(['/login']);
      return false;
    }
  }
}
