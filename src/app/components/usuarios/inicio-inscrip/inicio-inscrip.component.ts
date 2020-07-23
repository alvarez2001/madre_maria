import { Component, OnInit } from '@angular/core';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { Global } from 'src/app/constantes/global';
import { LoginService } from 'src/app/services/login/login.service';
import { Usuario } from 'src/app/models';


@Component({
  selector: 'app-inicio-inscrip',
  templateUrl: './inicio-inscrip.component.html',
  providers:[IncripcionService]
})
export class InicioInscripComponent implements OnInit {

  url:string = Global.url;

  estudiante!:Usuario ;

  idEstudiante:number = 0;
  porcentaje:number = 0
  current:number = 0;
  solicitud:string = '';
  max:number = 100;
  constructor(private incripSvc:IncripcionService, private loginSvc:LoginService) {
    this.idEstudiante = this.loginSvc.regresarEstudiante();
    console.log(this.loginSvc.regresarUsuario())
    this.estudiante = this.loginSvc.regresarUsuario()
  }

  ngOnInit(): void {
    this.pasoActual();
  }

  cambioValor(event:any){
    /* console.log(event) */
  }


  textoCurrent(current:number):string{
    if(this.current === current) return 'Ingresar información';
    if(this.current < current) return 'Pendiente';
    if(this.current > current) return 'Completado';

    return 'Cargando...'
  }
  private pasoActual(){
    this.incripSvc.procesoSolicitud().subscribe(res => {
      this.current = res.paso + 1;
      this.porcentaje = res.porcentaje;
      this.solicitud = res.tipoSolicitud
    })
  }

}
