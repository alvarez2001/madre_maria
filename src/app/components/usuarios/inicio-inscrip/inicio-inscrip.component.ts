import { Component, OnInit } from '@angular/core';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { Global } from 'src/app/constantes/global';
import { LoginService } from 'src/app/services/login/login.service';
import { Usuario } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';

import { ModalPagosReferenciaComponent } from "src/app/components/usuarios/modal-pagos-referencia/modal-pagos-referencia.component";

@Component({
  selector: 'app-inicio-inscrip',
  templateUrl: './inicio-inscrip.component.html',
  providers:[IncripcionService]
})
export class InicioInscripComponent implements OnInit {

  url:string = Global.url;

  estudiante!:Usuario ;
  bloquear:boolean = false;

  idEstudiante:number = 0;
  porcentaje:number = 0
  current:number = 0;
  solicitud:string = '';
  max:number = 100;
  constructor(private incripSvc:IncripcionService, private loginSvc:LoginService,private dialog:MatDialog) {
    this.idEstudiante = this.loginSvc.regresarEstudiante();
    /* console.log(this.loginSvc.regresarUsuario()) */
    this.estudiante = this.loginSvc.regresarUsuario()
  }

  ngOnInit(): void {
    this.comprobarNumerosReferencia();
    this.pasoActual();
  }

  private comprobarNumerosReferencia(){
    this.incripSvc.consultarSiexisteTransferencia().subscribe(res => {
      if(res === 'false'){
        this.llamarModalRefencia()
      }
    })
  }

  private llamarModalRefencia(){
    const dialogRef = this.dialog.open(ModalPagosReferenciaComponent,{
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.bloquear = result
    });
  }


  textoCurrent(current:number):string{
    if(this.current === current) return 'Ingresar información';
    if(this.current < current) return 'Pendiente';
    if(this.current > current) return 'Completado';

    return 'Cargando...'
  }
  private pasoActual(){
    this.incripSvc.procesoSolicitud().subscribe(res => {
      const contador:any = res.paso ;
      sessionStorage.setItem('paso', btoa(contador))
      sessionStorage.setItem('tipoSolicitud', btoa(res.tipoSolicitud))
      this.current = res.paso + 1;
      this.porcentaje = res.porcentaje;
      this.solicitud = res.tipoSolicitud
    })
  }

}
