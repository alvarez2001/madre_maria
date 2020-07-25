import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Paginacion } from 'src/app/models';
import { Global } from 'src/app/constantes/global';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styles: [
  ]
})
export class PaginacionComponent implements OnInit {

  @Input('paginacion') paginate!:Paginacion;

  @Output() emitir:EventEmitter<Paginacion> = new EventEmitter();

  url:string = Global.url;
  constructor(private http:HttpClient,private sharedSvc:SharedService) {

   }

  ngOnInit(): void {
  }

  public paginacionUrl(url:string):void{
    this.sharedSvc.lanzarCarga(true)

    this.http.get<Paginacion>(url).subscribe((res:Paginacion) => {
      this.sharedSvc.lanzarCarga(false);
      this.emitir.emit(res);
    })
  }
}
