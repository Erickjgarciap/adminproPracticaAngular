import { Injectable } from '@angular/core';
import { Hospital } from '../../../models/hospital.model';
import { Usuario } from '../../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivos/subir-archivo.service';



@Injectable()
export class HospitalesService {
  hospital: Hospital;
  usuario: Usuario;
  token: string;
  constructor(public http: HttpClient,
    public _router: Router, public _subirArchivoservice: SubirArchivoService) {

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
    cargarHospitales() {
      let url_cargarHospitales = URL_SERVICIOS + '/hospital/';
       // return this.http.get(url_cargarHospitales).map( (resp: any) => resp.hospitales );
      return this.http.get(url_cargarHospitales);
    }
    crearHospital(nombre: string) {
      let url_hospital = URL_SERVICIOS + '/hospital';
      url_hospital += '?token=' + this.token;
     return  this.http.post(url_hospital, {nombre})
     .map( (resp: any) => {
         return resp;
     });
     }
    buscarHospitales( termino: string) {
      let url_cargarHospitales = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
      return this.http.get(url_cargarHospitales).
                        map( (resp: any) => resp.hospitales );
     }
     cambiarImagen(file: File, id: string ) {
      this._subirArchivoservice.subirArchivo(file, 'hospitales', id ).then((resp: any) => {
        // console.log("ok", resp);
        this.hospital.img = resp.hospital.img;
      }).catch(resp => {
        console.log("error ", resp);
      });
    }
    borrarHospital(id: string) {
      let url_borrar = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;
      return this.http.delete(url_borrar).
      map(resp => {
        swal('Hospital borrado', 'El hospital a sido eliminado correctamente', 'success');
        return true;
      });
    }
    actualizar(hospital: Hospital) {
      let url_actualizar = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.token;
     return  this.http.put( url_actualizar, hospital);
    }
}
