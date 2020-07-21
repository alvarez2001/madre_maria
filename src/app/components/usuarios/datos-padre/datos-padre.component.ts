import { Component, OnInit } from '@angular/core';
import { Nacionalidad, PatronEmail, estadoCivil, nivelAca, frecuenciaViaje } from 'src/app/constantes/grados';
import { FormGroup } from '@angular/forms';
import { datosPadre } from './datos-padre';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { CedulaModel } from 'src/app/services/incripcion/cedula.model';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-datos-padre',
  templateUrl: './datos-padre.component.html',
  styles: [],
  providers:[IncripcionService]
})
export class DatosPadreComponent implements OnInit {
  nacionalidad: any[];
  datosPadre: datosPadre;
  patronE:string;
  Ecivil:string[];
  NivelA:string[];
  frecuenciaVia:string[];
  blockDatos:boolean = true;


  constructor(private incripSvc:IncripcionService, private loginSvc:LoginService, private route:Router, private sharedSvc:SharedService) {
    this.frecuenciaVia = frecuenciaViaje;
    this.NivelA = nivelAca;
    this.patronE = PatronEmail;
    this.Ecivil = estadoCivil;
    this.nacionalidad = Nacionalidad;
    this.datosPadre = {
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

  ngOnInit(): void {}

  guardarData(form: FormGroup) {
    if(form.valid){
      this.incripSvc.asignarPadre(this.datosPadre).subscribe(res => {
        this.route.navigate(['/formularios']);
        this.sharedSvc.mensajeSuccessAlerta(res)
      })
    }
  }

  verificarCedula(e:any){
    const event = e.target.value
    if(event.length > 6){
      const datos:CedulaModel = {
        cedula:event
      }
      this.incripSvc.verificarCedulaPadre(datos).subscribe(datos =>{
        const estudiante = this.loginSvc.regresarUsuario();
        if(typeof datos === 'object'){
          this.incripSvc.mostrarMensajeConfirm(datos,estudiante).then(
            (result:any) => {
              if(result.value){
                this.incripSvc.asignarPadreExistente(datos.id).subscribe((res:any) => {
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

  }

}
