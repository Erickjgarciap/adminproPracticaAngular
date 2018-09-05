import { Usuario } from '../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  constructor(public _usuarioservice: UsuarioService) {
    this.usuario = this._usuarioservice.usuario;
   }

  ngOnInit() {
  }
  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google || !this.usuario.face) {
      this.usuario.email = usuario.email;
    }
    this._usuarioservice.actualizar(this.usuario).subscribe();
  }
  seleccionImagen(archivo: File) {
    if (!archivo) {
        this.imagenSubir = null;
        return;
    }
      this.imagenSubir = archivo;
  }
  cambiarImagen() {
    this._usuarioservice.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
