import { Component, OnInit } from '@angular/core';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { datosPadre } from '../datos-padre/datos-padre';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
import { frecuenciaViaje, nivelAca, PatronEmail, estadoCivil, Nacionalidad } from 'src/app/constantes/grados';
import { FormGroup } from '@angular/forms';
import { CedulaModel } from 'src/app/services/incripcion/cedula.model';

@Component({
  selector: 'app-datos-madre',
  templateUrl: './datos-madre.component.html',
  styles: [
  ],
  providers:[IncripcionService]
})
export class DatosMadreComponent implements OnInit {
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
      this.incripSvc.asignarMadre(this.datosPadre).subscribe(res => {
        this.route.navigate(['/formularios']);
        console.log(res)
        this.sharedSvc.mensajeSuccessAlerta(res)
      })
    }
  }

  verificarCedula(e:any){
    const event = e.target.value
    if(event.length > 6){
      const cedula:CedulaModel = {
        cedula:event
      }
      this.incripSvc.verificarCedulaMadre(cedula).subscribe((datos:any) =>{
        const estudiante = this.loginSvc.regresarUsuario();
        if(typeof datos === 'object'){
          this.incripSvc.mostrarMensajeConfirm(datos,estudiante,'madre', 'de la madre').then(
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

  }

}
