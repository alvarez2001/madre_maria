import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Global } from '../../constantes/global'
import { Observable } from 'rxjs';
import { SharedService } from "../shared/shared.service";
import { map } from "rxjs/operators";
import { Router } from '@angular/router';


@Injectable()
export class TecnicoService {
  private url:string = Global.url

  constructor(private router:Router,private http:HttpClient, private sharedSvc:SharedService) { }

  enviarMensajeSoporte(data:any):Observable<any>{
    this.sharedSvc.lanzarCarga(true)
    return this.http.post(this.url+'add/soporte/tecnico',data).pipe(
      map((result:any) => {
        this.sharedSvc.lanzarCarga(false);
        this.sharedSvc.mensajeSuccessAlerta(result);
        this.router.navigate(['/']);
        return result
      })
    )
  }
}
