import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/app/constantes/global';
import { Observable } from 'rxjs';
import { RegistroEstudiante } from 'src/app/components/usuarios/registro-estudiante/registroEstudiante';
import { LoginModel } from 'src/app/components/usuarios/login/login.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string
  constructor(private http:HttpClient) {
    this.url = Global.url;
   }


  regresarToken():string | null {
    const token = sessionStorage.getItem('token');
    return token;
  }
  regresarEstudiante():any{
    return sessionStorage.getItem('estudiante')
  }
  regresarUsuario():object | null{
    const data:any = sessionStorage.getItem('usuario');
    const datos:object | null = JSON.parse(data)
    return datos
  }





  loginEstudiante(data:LoginModel):Observable<any>{
    return this.http.post(this.url+'login',data).pipe(
      map((datos:any) => {
        sessionStorage.setItem('token',datos.access_token);
        sessionStorage.setItem('estudiante', datos.estudiante.id);
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
