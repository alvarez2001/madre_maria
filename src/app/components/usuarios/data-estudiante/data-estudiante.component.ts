import { Component, OnInit } from '@angular/core';
import { dataEstudiante } from './data-estudiante';
import { ubicacion, municipios, parroquias, tipoInstitucion } from 'src/app/constantes/grados';
import { FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/services/shared/shared.service';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-estudiante',
  templateUrl: './data-estudiante.component.html',
  providers:[IncripcionService]
})
export class DataEstudianteComponent implements OnInit {

  dataEstudiante:dataEstudiante;
  zonaUbicacion:string[];
  municipios:string[];
  parroquias:any[];
  tipoinstitucion : string[];
  constructor(public sharedSvc:SharedService, private incripSvc:IncripcionService, private router:Router) {
    this.zonaUbicacion = ubicacion;
    this.municipios = municipios;
    this.parroquias = parroquias;
    this.tipoinstitucion = tipoInstitucion;
    this.dataEstudiante = {
      ubicacion:'',
      zona:'',
      sector:'',
      municipio:'',
      parroquia:'',
      tlf_habitacion:'',
      enfermedad:'',
      tipo_enfermedad:'',
      alergica:'',
      tipo_alergica:'',
      bautizo:'',
      comunion:'',
      confirmacion:'',
      repitiente:'',
      procedencia:'',
      tipo_institucion:'',
      solvencia:'',
      canaima:'',
      serial:'',
      mensualidad:null,
      beca:''
    }
  }

  ngOnInit(): void {
  }

  guardarData(form:FormGroup){
    if(form.valid){

      const data:any = this.dataEstudiante;
      for (const propName in data) {
        if (data[propName] === null || data[propName] === undefined || data[propName] === '') {
          delete data[propName];
        }
      }

      this.sharedSvc.lanzarCarga(true)
      this.incripSvc.IdentificacionEstudiante(data).subscribe(
        res => {this.sharedSvc.lanzarCarga(false), this.router.navigate(['/formularios'])},
        err => this.sharedSvc.lanzarCarga(false)
      )
    }
  }

}
