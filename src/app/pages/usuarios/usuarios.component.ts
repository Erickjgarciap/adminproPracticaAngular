import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
/* Solucion sweetalert 1 en la definicion del boton en el swal */
import * as _swal from 'sweetalert';
declare var swal: any;
swal = _swal;
/* Fin de la solucion */
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  inicioConteoUsuario: number = 5;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.ocultarModal();
    this._modalUploadService.notificacion.subscribe( resp => this.cargarUsuarios());

  }
  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe( (resp: any) => {
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
        });
        this.cargando = false;
  }
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;


   if ( desde >= this.totalRegistros ) {
      return;
    }
    if ( desde < 0) {
      return;
    }

  //  console.log("Nuevo desde", this.desde);
    this.desde += valor;
    this.inicioConteoUsuario += valor;
    console.log("Usuarios cargados ", this.inicioConteoUsuario);
    this.cargarUsuarios();
  }
  buscarUsuario( termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
      this._usuarioService.buscarUsuarios(termino).
          subscribe( (usuarios: Usuario[]) => {
            console.log(usuarios);
            this.usuarios = usuarios;
            this.cargando = false;
          });
  }
  borrarUsuario( usuario: Usuario) {

    if ( usuario._id === this._usuarioService.usuario._id) {
        swal('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
        return;
    }
    swal({
      title: '¿Estás seguro?',
      text: "Está a punto de borrar al usuario " + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( (borrar) => {
      if (borrar) {
       this._usuarioService.borrarUusuario(usuario._id).subscribe(
         (borrado: boolean) => {
           console.log(borrado);

          // if (borrado) {
            this.desde = 0;
            this.cambiarDesde(0);
            this.cargarUsuarios();
           // }
         }
       );
      }
    });

  }
  guardarUsuario( usuario: Usuario) {
    this._usuarioService.actualizar(usuario).subscribe();
  }

  mostrarModal( id: string) {
    console.log("usuario id desde modal " + id);
    this._modalUploadService.mostrarModal('usuarios', id);
  }
}

