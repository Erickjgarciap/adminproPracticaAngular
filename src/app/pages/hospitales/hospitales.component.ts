import { Component, OnInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { HospitalesService } from '../../services/hospital/hospitales.service';
import { Hospital } from '../../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
/* Solucion sweetalert 1 en la definicion del boton en el swal */
import * as _swal from 'sweetalert';
declare var swal: any;
swal = _swal;
/* Fin de la solucion */
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  totalHospitales: number = 0;
  hospitales: Hospital[] = [];
  cargando: boolean = true;
  constructor(public _hospitalService: HospitalesService, public _modalUploadService: ModalUploadService) {
    this.cargarHospitales();
    // this._modalUploadService.ocultarModal();
    this._modalUploadService.notificacion.subscribe( resp => this.cargarHospitales());
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
  buscarHospital( termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
      this._hospitalService.buscarHospitales(termino).
          subscribe( (hospitales: Hospital[]) => {
            console.log(hospitales);
            this.hospitales = hospitales;
            this.cargando = false;
          });
  }
  mostrarModal( id: string) {
    console.log("hospital id desde modal " + id);
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  borrarHospital(hospital: Hospital) {
  swal({
    title: '¿Estás seguro?',
    text: "Está a punto de borrar a " + hospital.nombre,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then( (borrar) => {
    if (borrar) {
     this._hospitalService.borrarHospital(hospital._id).subscribe(
       (borrado: boolean) => {
         this.cargarHospitales();
         console.log(borrado);
       }
     );
    }
  });

}
guardarHospital( hospital: Hospital) {
  this._hospitalService.actualizar(hospital).subscribe(
    (resp: any) => {
    console.log(resp);
    if (resp.ok) {
      console.log("swall aqui");
      }
    }

  );
}
swalnuevoHospital() {
  swal({
    text: 'Ingresa el nombre del nuevo hospital',
    content: "input",
    icon: 'info',
    buttons: true,
    dangerMode: true
  }).then((valor: string) => {

    if (!valor || valor.length === 0) {
      return;
    }
    this._hospitalService.crearHospital(valor)
    .subscribe(() => this.cargarHospitales());
   } );

}

}
