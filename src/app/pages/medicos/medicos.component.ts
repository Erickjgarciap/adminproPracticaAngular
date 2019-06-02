import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  listamedicos: Medico[] = [];
  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedicos(termino: string) {
  }
  crearMedico() {

  }
  cargarMedicos() {
    this._medicoService.cargarMedicos().subscribe(medicos => this.listamedicos = medicos);
  }
}
