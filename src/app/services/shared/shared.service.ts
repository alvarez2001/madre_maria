import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  @Output() currentPage:EventEmitter<string> = new EventEmitter();
  PaginaCurrent(msj:string):void{
    this.currentPage.emit(msj)
  }

  /* PANTALLA DE CARGA */
  @Output() pantallaCarga:EventEmitter<boolean> = new EventEmitter();
  lanzarCarga(data:boolean){
    this.pantallaCarga.emit(data);
  }
  /* REPRESENTANTE */
  @Output() estadoVerificacionRepresentante:EventEmitter<boolean> = new EventEmitter();
  verificarRepresentante(data:boolean){
    this.estadoVerificacionRepresentante.emit(data);
  }

  @Output() dataRepresentante:EventEmitter<any> = new EventEmitter();
  compartirInfoRepresentante(data:any){
    this.dataRepresentante.emit(data);
  }


  /* ESTUDIANTES */
  @Output() estadoVerificacionEstudiante:EventEmitter<boolean> = new EventEmitter();
  verificarEstudiante(data:boolean){
    this.estadoVerificacionEstudiante.emit(data);
  }


  mostrarAlertaError(err:HttpErrorResponse) {
    const datos = document.createElement('ul');
    datos.classList.add('listaErrores');

    if(err.error instanceof Object){
      for (const prop in err.error) {

        const li = document.createElement('li');
        li.classList.add('listaErrores__item');
        const text = document.createTextNode(err.error[prop]);
        li.appendChild(text);
        datos.appendChild(li);
      }
    }else{
      const li = document.createElement('li');
        li.classList.add('listaErrores__item');
        const text = document.createTextNode(err.error);
        li.appendChild(text);
        datos.appendChild(li);
    }
    return this.mensajeAlerta(datos);
  }
  mensajeSuccessAlerta(title:string,timer:number = 10000){
    return Swal.fire({
      text:title,
      icon:'success',
      timer:timer,
      showConfirmButton: false,
      timerProgressBar:true
    })
  }

  private mensajeAlerta(datos: DocumentAndElementEventHandlers) {
    return Swal.fire({
      title: 'Error',
      icon: 'error',
      html: datos,
    });
  }


  validarCampos(control:NgControl, msjRequired:string, msjPattern:string = '', msjValidacion:string = 'La cedula del estudiante ingresado ya existe'):string{
    if(control.hasError('required')) return msjRequired;
    if(control.hasError('pattern')) return msjPattern;
    if(control.hasError('cedulaEstudiante')) return msjValidacion
    return msjRequired
  }

}
