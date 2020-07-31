import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TecnicoService } from "src/app/services/soporte/tecnico.service";

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  providers:[TecnicoService]
})
export class SoporteComponent implements OnInit {

  formContacto:FormGroup = new FormGroup({})

  constructor(private tecnicoSvc:TecnicoService,private sharedSvc:SharedService, private route:ActivatedRoute, private fb:FormBuilder) {
    this.sharedSvc.PaginaCurrent(this.route.snapshot.data.pagina);
   }

  ngOnInit(): void {
    this.formulario();
  }

  enviarAyuda(){
    const data = this.formContacto.value;
    this.tecnicoSvc.enviarMensajeSoporte(data).subscribe(res => {
    })
  }


  /* post add/soporte/tecnico */
  private formulario(){
    this.formContacto = this.fb.group({
      cedula_estudiante:new FormControl(''),
      titulo_mensaje:new FormControl(''),
      motivo:new FormControl('')
    })
  }

}
