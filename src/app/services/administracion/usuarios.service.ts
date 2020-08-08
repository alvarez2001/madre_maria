import { Injectable } from '@angular/core';
import { Global } from "./../../constantes/global";
import { Observable  } from 'rxjs';


import { HttpClient } from "@angular/common/http";
import { Paginacion, Usuario, DetalleUsuario } from 'src/app/models';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared/shared.service';
import { ModificarUsuario } from 'src/app/components/administrador/modificar-usuario/modificar-usuario.component';

@Injectable()
export class UsuariosService {

  private url:string;
  constructor(private http:HttpClient, private sharedSvc:SharedService) {
    this.url = Global.url
  }


  eliminarUsuarioporCedula(cedula:string):Observable<string>{
    this.sharedSvc.lanzarCarga(true);
    return this.http.delete<string>(this.url+'eliminar/datos/estudiante/usuario',{
      params:{cedula:cedula}
    }).pipe(
      map(value => {
        this.sharedSvc.lanzarCarga(false);
        return value;
      })
    )
  }

  modificarUsuarioCedula(datos:any, usuarioId:number, estudianteId:number):Observable<any>{
    this.sharedSvc.lanzarCarga(true);
    return this.http.post(this.url+'actualizacion/datos/'+usuarioId+'/'+estudianteId,datos).pipe(
      map(value => {
        this.sharedSvc.lanzarCarga(false);
        return value;
      })
    )
  }


  buscarInfoPorCedula(cedula:string):Observable<ModificarUsuario>{
    this.sharedSvc.lanzarCarga(true);
    return this.http.post<ModificarUsuario>(this.url+'buscar/informacion/estudiante',cedula).pipe(
      map(value => {
        this.sharedSvc.lanzarCarga(false);
        return value;
      })
    )
  }


  buscarTodosEstudiantesInactivos():Observable<Paginacion>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.get<Paginacion>(this.url+'usuarios/inactivos/estudiantes').pipe(
      map((paginacion:Paginacion) => {
        this.sharedSvc.lanzarCarga(false);
        return paginacion
      })
    )
  }

  buscarEstudiantesActivos():Observable<Paginacion>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.get<Paginacion>(this.url+'usuarios/activos/estudiantes').pipe(
      map((paginacion:Paginacion) => {
        this.sharedSvc.lanzarCarga(false);
        return paginacion;
      })
    )
  }

  /* informacion/estudiante/(cedula) */

  buscarUsuarioCedula(cedula:string):Observable<DetalleUsuario>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.get<DetalleUsuario>(this.url+'informacion/estudiante/'+cedula)
    .pipe(
      map( value => {
        this.sharedSvc.lanzarCarga(false);
        return DetalleUsuario.detalleObj(value);
      })
    )
  }


  activarUsuario(id:number):Observable<any>{

    this.sharedSvc.lanzarCarga(true)
    return this.http.post(this.url+'usuario/'+id+'/activar',null).pipe(
      map(value => {
        this.sharedSvc.lanzarCarga(false);
        return value
      })
    )
  }


  desactivarUsuario(id:number):Observable<any>{

    this.sharedSvc.lanzarCarga(true)
    return this.http.post(this.url+'usuario/'+id+'/desactivar',null).pipe(
      map(value => {
        this.sharedSvc.lanzarCarga(false);
        return value
      })
    )
  }
}
