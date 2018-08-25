import { Injectable } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';

@Injectable()
export class UsuarioService {

  constructor(public http: HttpClient) {
    console.log("servicio listo");
   }
  login(usuario: Usuario, recuerdame: boolean = false) {
  let url_login = URL_SERVICIOS + '/login';
  return this.http.post(url_login, usuario);
  }


  crearUsuario(usuario: Usuario) {
   let url_usuario = URL_SERVICIOS + '/usuarios';
  return  this.http.post(url_usuario, usuario)
  .map( (resp: any) => {
    swal('Usuario creado', usuario.email, 'success');
      return resp.usuario;
  });

  }
}
