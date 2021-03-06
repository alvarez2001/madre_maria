import { Injectable } from '@angular/core';
import { dataEstudiante } from 'src/app/components/usuarios/data-estudiante/data-estudiante';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/app/constantes/global';
import { map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { SharedService } from '../shared/shared.service';
import { CedulaModel } from './cedula.model';
import Swal from 'sweetalert2';
import { EstructuraFamiliarClass } from 'src/app/models/EstructuraClass';
import { PasoSolicitud, Direcciones, PlantelesEstudiantes, PreescolarStep1, PreescolarStep2 } from 'src/app/models';
import { modeloReferencias } from 'src/app/components/usuarios/modal-pagos-referencia/modal-pagos-referencia.component';

@Injectable()
export class IncripcionService {
  private url: string;

  private idEstudiante: number;
  constructor(
    private http: HttpClient,
    private loginSvc: LoginService,
    private sharedSvc: SharedService
  ) {
    this.url = Global.url;
    this.idEstudiante = this.loginSvc.regresarEstudiante();
  }


  /* ENVIAR NUMEROS DE REFERENCIA */

  /* transferencias/id  */

  enviarNumerosReferencia(data:any){
    this.sharedSvc.lanzarCarga(true);
    return this.http.post(this.url+'transferencias/'+this.idEstudiante,data).pipe(
      map(result => {
        this.sharedSvc.lanzarCarga(false);
        return result
      })
    )
  }


  /*  */

  addTransferencias(data:FormData){
    this.sharedSvc.lanzarCarga(true)
    return this.http.post(this.url+'add/transferencias/inscripciones/'+this.idEstudiante,data).pipe(
      map(result => {
        this.sharedSvc.lanzarCarga(false)
        return result
      })
    )
  }


  /* VERIFICAR NUMEROS DE REFERENCIA  */

  consultarSiexisteTransferencia():Observable<any>{
    this.sharedSvc.lanzarCarga(true);
    return this.http.get(this.url+'consulta/transferencias/'+this.idEstudiante).pipe(
      map(result => {
        this.sharedSvc.lanzarCarga(false);
        return result
      })
    )
  }




  /* PREESCOLAR PASO 1   */

  registrarDatosPreescolarStep1(data:PreescolarStep1){
    this.sharedSvc.lanzarCarga(true)
    return this.http.post(this.url+'add/datos/preescolar/primera/parte/'+this.idEstudiante,data).pipe(
      map(result => {
        this.sharedSvc.lanzarCarga(false)
        return result
      })
    )
  }

  /* PREESCOLAR PASO2  */

  registrarDatosPreescolarStep2(data:PreescolarStep2){
    this.sharedSvc.lanzarCarga(true);
    return this.http.post(this.url+'add/datos/preescolar/segunda/parte/'+this.idEstudiante,data).pipe(
      map(result => {
        this.sharedSvc.lanzarCarga(false);
        return result;
      })
    )
  }











  registrarDatosFamiliares(data:EstructuraFamiliarClass):Observable<any>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.post(this.url+'add/datos/estructura/familiar/'+this.idEstudiante,data).pipe(
      map(data => {

        this.sharedSvc.lanzarCarga(false);
        return data
      })
    )
  }


  /* VERIFICAR PASO DE LA SOLICITUD DEL ESTUDIANTE */

  procesoSolicitud():Observable<PasoSolicitud>{
    return this.http.get<PasoSolicitud>(this.url+'consulta/paso/solicitud/'+this.idEstudiante).pipe(
      map(paso => {

        return PasoSolicitud.pasoSolicitudObj(paso)
      })
    )
  }


  /* PASO 6 REGISTRAR DIRECCIONES */

  addEmergencia(datos:Direcciones):Observable<any>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.post(this.url+'add/datos/emergencia/'+this.idEstudiante,datos).pipe(
      map(data => {
        this.sharedSvc.lanzarCarga(false)
        return data
      })
    )
  }


  /* PASO 7 REGISTRAR PLANTELES */


  addPlanteles(data:{informacion:PlantelesEstudiantes[]}):Observable<any>{
    this.sharedSvc.lanzarCarga(true);
    return this.http.post(this.url+'add/datos/planteles/cursados/'+this.idEstudiante,data).pipe(
      map(data =>{
        this.sharedSvc.lanzarCarga(false);
        return data
      })
    )
  }

  /* PASO 8 RELACIONES DE EGRESO */


  addBalances(data:any) : Observable<any>{
    this.sharedSvc.lanzarCarga(true);
    return this.http.post(this.url+'add/datos/balances/razones/'+this.idEstudiante, data).pipe(
      map(dato => {
        this.sharedSvc.lanzarCarga(false)
        return dato
      })
    )
  }


  /* PASOS 1 Y 2 CREO ( OJO ) */

  IdentificacionEstudiante(data: dataEstudiante): Observable<any> {
    return this.http
      .post(this.url + 'add/datos/estudiante/' + this.idEstudiante, data)
      .pipe(
        map((data: any) => {
          this.sharedSvc.mensajeSuccessAlerta(data);
          return data;
        })
      );
  }

  asignarPadre(data:any):Observable<any>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.post(this.url+'add/datos/padre/'+this.idEstudiante,data).pipe(
      map(data => {
        this.sharedSvc.lanzarCarga(false)
        return data
      })
    )
  }

  verificarCedulaPadre(data: CedulaModel): Observable<any> {
    this.sharedSvc.lanzarCarga(true);
    return this.http.post(this.url + 'verificar/cedula/padre', data).pipe(
      map((datos: any) => {
        this.sharedSvc.lanzarCarga(false);
        return datos;
      })
    );
  }

  asignarPadreExistente(padreId: number): Observable<any> {
    this.sharedSvc.lanzarCarga(true);
    return this.http
      .post(
        this.url + 'add/padre/' + padreId + '/estudiante/' + this.idEstudiante,
        null
      )
      .pipe(
        map((data: any) => {
          this.sharedSvc.lanzarCarga(false);
          return data;
        })
      );
  }

  verificarCedulaMadre(data: CedulaModel): Observable<any> {
    this.sharedSvc.lanzarCarga(true);
    return this.http.post(this.url + 'verificar/cedula/madre', data).pipe(
      map((datos: any) => {
        this.sharedSvc.lanzarCarga(false);
        return datos;
      })
    );
  }

  asignarMadre(data:any):Observable<any>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.post(this.url+'add/datos/madre/'+this.idEstudiante,data).pipe(
      map(data => {
        this.sharedSvc.lanzarCarga(false)
        return data
      })
    )
  }

  asignarMadreExistente(madreID: number): Observable<any> {
    this.sharedSvc.lanzarCarga(true);
    return this.http
      .post(
        this.url + 'add/madre/' + madreID + '/estudiante/' + this.idEstudiante,
        null
      )
      .pipe(
        map((data: any) => {
          this.sharedSvc.lanzarCarga(false);
          return data;
        })
      );
  }

  mostrarMensajeConfirm(
    datos: any,
    dataEstudiante: any,
    padreNombre: string = 'padre',
    padreMadre: string = 'del padre'
  ): Promise<any> {
    return Swal.fire({
      title: `
      La cedula ${padreMadre} ya existe!!
      `,
      icon: 'info',
      html: `
      Desea asignar los datos de: <strong>${datos.apellidos}, ${datos.nombres}</strong> como ${padreNombre} a la estudiante:
      <strong>${dataEstudiante.apellidos}, ${dataEstudiante.nombres}</strong>
      `,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
  }
}
