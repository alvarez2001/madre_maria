import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { AdministradorService } from 'src/app/services/administracion';
import { Global } from 'src/app/constantes/global';

@Component({
  selector: 'app-planillas-vista',
  templateUrl: './planillas-vista.component.html',
  providers:[AdministradorService]
})
export class PlanillasVistaComponent implements OnInit {


  url:string = Global.url
  public idEstudiante:number = 0;
  public solicitud:string = '';
  cedulaElegida:string = '';
  mostrar:boolean = false;

  constructor(private sharedSvc:SharedService, private route:ActivatedRoute,private adminSvc:AdministradorService) {
    this.sharedSvc.PaginaCurrent(this.route.snapshot.data.pagina)
  }

  ngOnInit(): void {
  }


  generarPDF(){

    if(this.cedulaElegida !== ''){
      const cedula = {cedula : this.cedulaElegida};
      this.mostrar = false;
      this.adminSvc.verificarCedulaPlanilla(cedula).subscribe(res => {
        this.mostrar = true;
        this.idEstudiante = res.estudiante_id;
        this.solicitud = res.tipo_solicitud

      })
    }
  }
}
