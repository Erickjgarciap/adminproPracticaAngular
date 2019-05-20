import { Injectable, EventEmitter } from '@angular/core';
declare var jquery: any;
declare var $: any;
@Injectable()
export class ModalUploadService {


    public tipo: string;
    public id: string;
    public oculto: string = 'oculto';


    public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal() {
  this.oculto = 'oculto';
  this.id = null;
  this.tipo = null;
  $('.modal-body').find('textarea,input').val('');

  }
  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }

}
