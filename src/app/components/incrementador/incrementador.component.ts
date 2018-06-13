import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress ') txtprogress: ElementRef;
  @Input('nombre')  leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;
  @Output( ) cambiovalor: EventEmitter <number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onchanges(value: number) {
    // let elemHTML: any = document.getElementsByName('progreso');

    if (value >= 100 ) {
      this.progreso = 100;
    } else if ( value <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = value;
    }
       // elemHTML.value = this.progreso;
       this.txtprogress.nativeElement.value = this.progreso;
       this.cambiovalor.emit(this.progreso);
       this.txtprogress.nativeElement.focus();
  }
  cambiavalor(valor) {
    if ( this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if ( this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    this.cambiovalor.emit(this.progreso);
  }
}
