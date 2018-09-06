import { Usuario } from '../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
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
    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una Imagen', 'error');
      this.imagenSubir = null;
      return;
    }
      this.imagenSubir = archivo;
      let reader = new FileReader();
      let url_imgtemp = reader.readAsDataURL( archivo );
      reader.onloadend = () => this.imagenTemp = reader.result.toString();
  }
  cambiarImagen() {
    this._usuarioservice.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
