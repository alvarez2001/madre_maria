import { Injectable } from "@angular/core";
import { Global } from "../../constantes/global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SharedService } from "../shared/shared.service";
import { map } from "rxjs/operators";
import { Usuario } from 'src/app/models';

@Injectable()
export class AdministradorService{

  private url:string = Global.url;

  constructor(private http:HttpClient,private sharedSvc:SharedService){}


  registrarUsuarioAdmin(data:any):Observable<any>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.post(this.url+'usuarios/registrar',data).pipe(
      map(result => {
        this.sharedSvc.lanzarCarga(false)
        return result
      })
    )
  }


  verificarCedulaPlanilla(data:{cedula:string}):Observable<any>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.post(this.url+'planilla',data).pipe(
      map(result => {
        this.sharedSvc.lanzarCarga(false);
        return result;
      })
    )
  }


  informacionPersonalUsuario(data:{cedula:string}):Observable<Usuario>{
    this.sharedSvc.lanzarCarga(true);
    return this.http.post<Usuario>(this.url+'usuario/informacion/personal',data).pipe(
      map(result =>{
        this.sharedSvc.lanzarCarga(false);
        return Usuario.UsuarioObj(result) ;
      })
    )
  }



  restablecerContrasena(id:number){
    this.sharedSvc.lanzarCarga(true);
    return this.http.post(this.url+'reestablecer/password/usuario/'+id,null).pipe(
      map(result => {
        this.sharedSvc.lanzarCarga(false);
        return result
      })
    )
  }


 consultarNomina(data:{grado:string}):Observable<any>{
   this.sharedSvc.lanzarCarga(true)
  return this.http.post(this.url+'consultar/nominas',data).pipe(
    map(result => {
      this.sharedSvc.lanzarCarga(false)
      return result
    })
  )
 }

}
