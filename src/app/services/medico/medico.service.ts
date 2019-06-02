import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class MedicoService {
totalmedicos: number = 0;
  constructor(
    public http: HttpClient
  ) { }

  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url).map((resp: any) => {
      console.log(resp);
      this.totalmedicos = resp.total;
      return resp.medicos;
    });
  }
}
