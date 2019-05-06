import { Injectable } from '@angular/core';
import { Hospital } from '../../../models/hospital.model';
import { Usuario } from '../../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { Router } from '@angular/router';




@Injectable()
export class HospitalesService {
  hospital: Hospital;
  usuario: Usuario;
  token: string;
  constructor(public http: HttpClient,
    public _router: Router) {

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

}
