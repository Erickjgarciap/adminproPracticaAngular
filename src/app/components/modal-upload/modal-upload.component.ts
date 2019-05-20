import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivos/subir-archivo.service';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
/* Solucion sweetalert 1 en la definicion del boton en el swal */
import * as _swal from 'sweetalert';
declare var swal: any;
swal = _swal;
/* Fin de la solucion */


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

imagenSubir: File;
imagenTemp: string;

  constructor(public _subirArchivoService: SubirArchivoService , public _modalUploadService: ModalUploadService) {

    console.log("Modal listo");
  }
  ngOnInit() {
    console.log("Iniciando");
    this.imagenTemp = null;
    this.imagenSubir = null;
  }
  subirImagen() {
    this._subirArchivoService.subirArchivo (this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id ).
     then(resp => {
       console.log( 'Probando respuesta si funciona el llamado a modalUploadService ' + resp);
            this._modalUploadService.notificacion.emit( resp );
            this.cerrarModal();
            swal({
              title: 'Exito',
              text: 'La imagen se ha subido correctamente',
              icon: 'success',
              buttons: false,
              timer: 2700
            });

     }).catch(err => {

          console.log("error al subir archivo " + err);
          this._modalUploadService.ocultarModal();
          this.cerrarModal();
          swal({
            title: 'Error',
            text: 'Error al actualizar imagen',
            icon: 'warning',
            buttons: false,
            timer: 2700,
            dangerMode: true,
          });
     });
  }
  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
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
}
