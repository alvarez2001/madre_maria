import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { datosPadre } from '../datos-padre/datos-padre';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
import { frecuenciaViaje, nivelAca, PatronEmail, estadoCivil, Nacionalidad } from 'src/app/constantes/grados';
import { FormGroup, FormControl, NgModel } from '@angular/forms';
import { CedulaModel } from 'src/app/services/incripcion/cedula.model';
import { debounceTime, distinctUntilChanged, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-datos-madre',
  templateUrl: '../datos-padre/datos-padre.component.html',
  styles: [
  ],
  providers:[IncripcionService]
})
export class DatosMadreComponent implements OnInit,AfterViewInit {
  nacionalidad: any[];
  datosPadre: datosPadre;
  patronE:string;
  Ecivil:string[];
  NivelA:string[];
  frecuenciaVia:string[];
  blockDatos:boolean = true;
  viveofallecido:boolean = false;
  title:string = 'de la madre';
  @ViewChild('cedula')
  children!: NgModel;

  ngAfterViewInit(){
    this.children.valueChanges?.pipe(
      debounceTime(1500),
      distinctUntilChanged(),
      map(result => result !== '' ? result.trim(): '')
    )
    .subscribe(res => {
      if(res.length > 6){
        const dataCedula:CedulaModel = {
          cedula:res
        }
        this.incripSvc.verificarCedulaMadre(dataCedula).subscribe(datos =>{
          const estudiante = this.loginSvc.regresarUsuario();
          if(typeof datos === 'object'){
            this.incripSvc.mostrarMensajeConfirm(datos,estudiante).then(
              (result:any) => {
                if(result.value){
                  this.incripSvc.asignarMadreExistente(datos.id).subscribe((res:any) => {
                    this.route.navigate(['/formularios']);
                    this.sharedSvc.mensajeSuccessAlerta(res)
                  })
                }else{
                  this.blockDatos = true;
                }
              }
            )
          }else{
            this.blockDatos = false;
          }
        })
      }
    })
  }

  constructor(private incripSvc:IncripcionService, private loginSvc:LoginService, private route:Router, private sharedSvc:SharedService) {
    this.frecuenciaVia = frecuenciaViaje;
    this.NivelA = nivelAca;
    this.patronE = PatronEmail;
    this.Ecivil = estadoCivil;
    this.nacionalidad = Nacionalidad;
    this.datosPadre = {
      vive:'',
      apellidos: '',
      nombres: '',
      nacionalidad: '',
      cedula:'',
      lugar_nacimiento: '',
      fecha_nacimiento: null,
      direccion: '',
      celular: '',
      email: '',
      tlf_local: '',
      estado_civil: '',

      /* INFORMACION RELIGIOSA */
      religion: '',
      va_misa: '',
      reconciliacion: '',
      grupo_apostolico: '',
      nombre_grupo: '',
      parroquia: '',

      /* INFORMACION GENERAL */
      nivel_academico: '',
      jubilado: '',
      profesion: '',
      ocupacion: '',
      trabaja: '',
      cargo: '',
      empresa: '',
      direccion_empresa: '',
      tlf_empresa: '',
      viaja: '',
    };
  }

  ngOnInit(): void {

  }


  guardarData(form: FormGroup) {
    if(form){

      const data:any = this.datosPadre;
      for (const propName in data) {
        if (data[propName] === null || data[propName] === undefined || data[propName] === '') {
          delete data[propName];
        }
      }

      this.incripSvc.asignarMadre(this.datosPadre).subscribe(res => {
        this.route.navigate(['/formularios']);
        console.log(res)
        this.sharedSvc.mensajeSuccessAlerta(res)
      })
    }
  }

  dataVive(vive:NgModel){
    if(vive.value === "1"){
      this.viveofallecido = true
    }else{
      this.viveofallecido = false;
    }
  }

}
