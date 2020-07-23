import { Injectable } from '@angular/core';
import { Global } from "./../../constantes/global";
import { Observable  } from 'rxjs';


import { HttpClient } from "@angular/common/http";
import { Paginacion, Usuario } from 'src/app/models';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class UsuariosService {

  private url:string;
  constructor(private http:HttpClient, private sharedSvc:SharedService) {
    this.url = Global.url
  }

  buscarTodosEstudiantesInactivos():Observable<Paginacion>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.get<Paginacion>(this.url+'usuarios/inactivos').pipe(
      map((paginacion:Paginacion) => {
        this.sharedSvc.lanzarCarga(false);
        return paginacion
      })
    )
  }


  buscarUsuario(id:number):Observable<Usuario>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.get<Usuario>(this.url+'usuario/inactivo/'+id)
    .pipe(
      map( value => {
        this.sharedSvc.lanzarCarga(false);
        return Usuario.UsuarioObj(value);
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
