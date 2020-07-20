import { Component, OnInit } from '@angular/core';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';


@Component({
  selector: 'app-inicio-inscrip',
  templateUrl: './inicio-inscrip.component.html',
  providers:[IncripcionService]
})
export class InicioInscripComponent implements OnInit {

  porcentaje:number = 0
  current:number = 0;
  max:number = 100;
  constructor(private incripSvc:IncripcionService) { }

  ngOnInit(): void {
    this.pasoActual();
  }

  cambioValor(event:any){
    /* console.log(event) */
  }


  textoCurrent(current:number):string{
    if(this.current === current) return 'Ingresar información';
    if(this.current < current) return 'Pendiente';
    if(this.current > current) return 'Completado';

    return 'Cargando...'
  }
  private pasoActual(){
    this.incripSvc.procesoSolicitud().subscribe(res => {
      this.current = res.paso + 1;
      this.porcentaje = res.porcentaje;
    })
  }

}
