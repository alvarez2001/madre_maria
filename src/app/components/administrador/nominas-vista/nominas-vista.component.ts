import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Grados } from 'src/app/constantes/grados';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { AdministradorService } from 'src/app/services/administracion';
import { Global } from 'src/app/constantes/global';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-nominas-vista',
  templateUrl: './nominas-vista.component.html',
  providers:[AdministradorService]
})
export class NominasVistaComponent implements OnInit {

  public grado: string[] = Grados;



  gradoElegido:string = '';
  url:string = Global.url;
  token:string | any = '';
  public activar:boolean = false;



  constructor(private loginSvc:LoginService,private sharedSvc:SharedService, private route:ActivatedRoute, private adminSvc:AdministradorService) {
    this.sharedSvc.PaginaCurrent(this.route.snapshot.data.pagina)
    this.token = this.loginSvc.regresarToken();
  }

  ngOnInit(): void {
  }

  generarPdf(){
    const grado = {grado: this.gradoElegido};

    if(grado.grado !== ''){
      //
      this.adminSvc.consultarNomina(grado).subscribe(res => {
        console.log(res)
        if(res === 'true'){
          window.open(this.url+'planilla/inscripciones/nomina/'+this.gradoElegido)
        }
      })
    }

  }
}
