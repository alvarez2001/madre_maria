import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/app/constantes/global';
import { Observable } from 'rxjs';
import { RegistroEstudiante } from 'src/app/components/usuarios/registro-estudiante/registroEstudiante';
import { LoginModel } from 'src/app/components/usuarios/login/login.model';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string
  constructor(private http:HttpClient,private sharedSvc:SharedService, private route:Router) {
    this.url = Global.url;
   }


   /* comprobar status del sistema */

   comprobarStatusSistema(){
     this.sharedSvc.lanzarCarga(true);
     return this.http.get(this.url+'sistema/status/inscripcion').pipe(
       map(result => {
         this.sharedSvc.lanzarCarga(false);
         return result
       })
     )
   }


  regresarToken():string | null {
    const token = sessionStorage.getItem('token');
    return token;
  }
  regresarEstudiante():any{
    const devuelve:any = sessionStorage.getItem('estudiante');
    const decodificar = atob(devuelve)
    return decodificar;
  }
  regresarUsuario():any | null{
    const data:any = sessionStorage.getItem('usuario');
    const datos:Usuario | null = JSON.parse(data)
    return datos
  }


  /* logout */

  logoutUsuario():Observable<any>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.get(this.url+'logout').pipe(
      map(result => {
        this.sharedSvc.lanzarCarga(false)
        return result
      })
    )
  }

  borrarDatos(res:string){
    sessionStorage.clear();
    this.sharedSvc.mensajeSuccessAlerta(res)
    this.route.navigate(['/'])
  }



  loginEstudiante(data:LoginModel):Observable<any>{
    return this.http.post(this.url+'login',data).pipe(
      map((datos:any) => {
        sessionStorage.setItem('token',datos.access_token);
        if(datos.estudiante){
          const estudiante = btoa(datos.estudiante.id)
          sessionStorage.setItem('estudiante', estudiante);
        }

        sessionStorage.setItem('usuario', JSON.stringify(datos.usuario))
        return datos
      })
    )
  }

  registrarEstudianteRepresentante(data:RegistroEstudiante):Observable<any>{
    return this.http.post(this.url+ 'registrar/estudiante', data)
  }

  registrarEstudiante(data:RegistroEstudiante, idRepresentante:number):Observable<any>{
    return this.http.post(this.url+'registrar/estudiante/representante/'+idRepresentante,data)
  }

  verificarCedulaEstudiante(data:any):Observable<any>{
    return this.http.post(this.url+'verificar/cedula/estudiante',data)
  }

  verificarCedulaRepresentante(data:any):Observable<any>{
    return this.http.post(this.url+'verificar/cedula/representante',data)
  }

}
