import { Injectable } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivos/subir-archivo.service';

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(public http: HttpClient,
              public _router: Router,
              public _subirArchivoservice: SubirArchivoService) {

    console.log("servicio listo");
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
        this.token = '';
        this.usuario = null;
    }
   }
   estaLogueado() {
     return (this.token.length > 5 ) ? true : false;
   }
   guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
   }
   logOut() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    this._router.navigate(['/login']);
   }

   logingoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token} )
              .map((resp: any) => {
                this.guardarStorage(resp.id, resp.token, resp.usuario);
                return true;
              });
   }
   loginface(token: string) {

    let url = URL_SERVICIOS + '/login/facebook';
    return this.http.post(url, {token} ).map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    });

   }
  login(usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
  let url_login = URL_SERVICIOS + '/login';
  return this.http.post(url_login, usuario).map((resp: any) => {
    /*
    localStorage.setItem('id', resp.id);
    localStorage.setItem('token', resp.token);
    localStorage.setItem('usuario', JSON.stringify(resp.usuario));
    */
  this.guardarStorage(resp.id, resp.token, resp.usuario);
    return true;
  });
  }


  crearUsuario(usuario: Usuario) {
   let url_usuario = URL_SERVICIOS + '/usuarios';
  return  this.http.post(url_usuario, usuario)
  .map( (resp: any) => {
    swal('Usuario creado', usuario.email, 'success');
      return resp.usuario;
  });

  }
  actualizar(usuario: Usuario) {
    let url_actualizar = URL_SERVICIOS + '/usuarios/' + usuario._id + '?token=' + this.token;
   return  this.http.put( url_actualizar, usuario)
           .map((resp: any) => {
            this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
            swal('Usuario actualizado', usuario.nombre, 'success');
            return true;
           });
  }
  cambiarImagen(file: File, id: string ) {
    this._subirArchivoservice.subirArchivo(file, 'usuarios', id ).then((resp: any) => {
      console.log("ok", resp);
      this.usuario.img = resp.usuario.img;
      swal('Imagen actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario);
    }).catch(resp => {
      console.log("error ", resp);
    });
  }
}
