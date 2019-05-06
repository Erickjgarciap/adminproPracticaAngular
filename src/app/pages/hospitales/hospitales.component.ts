import { Component, OnInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { HospitalesService } from '../../services/hospital/hospitales.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  totalHospitales: number = 0;
  hospitales: Hospital[] = [];
  cargando: boolean = true;
  constructor(public _hospitalService: HospitalesService) {
  }
  ngOnInit() {
    this.cargarHospitales();

  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales().subscribe((resp: any) => {
        this.totalHospitales = resp.total;
        this.hospitales = resp.hospitales;
    });
  this.cargando = false;
  }
}
