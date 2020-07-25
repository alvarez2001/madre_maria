import { Component, OnInit } from '@angular/core';
import { anosEscolares, Grados } from 'src/app/constantes/grados';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { PlantelesEstudiantes } from "src/app/models";
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planteles',
  templateUrl: './planteles.component.html',
  providers:[IncripcionService]
})
export class PlantelesComponent implements OnInit {

  anosEscolares:string[] = anosEscolares;
  plantelesCursados:FormGroup = new FormGroup({});
  plantelesArray:FormGroup = new FormGroup({});

  grados:string[] = Grados;

  constructor(private fb : FormBuilder, private incripSvc:IncripcionService, private sharedSvc:SharedService, private router:Router) {
    this.plantelesCursados = this.fb.group({
      ano:new FormControl(''),
      plantel:new FormControl(''),
      estado:new FormControl(''),
      ciudad:new FormControl(''),
      grado:new FormControl(''),
      calificacion:new FormControl(''),
    });
    this.plantelesArray = this.fb.group({
      informacion : this.fb.array([], [Validators.required, Validators.min(1)]),
    })
   }

  ngOnInit(): void {
  }

  enviarInfo(){
    if(this.plantelesArray.value.informacion.length > 0){
      const data:{informacion:PlantelesEstudiantes[]} = this.plantelesArray.value;
      this.incripSvc.addPlanteles(data).subscribe(res => {
        this.sharedSvc.mensajeSuccessAlerta(res)
        this.router.navigate(['/formularios'])
      })
    }
  }

  eliminar(numero:number){
    this.plantelesEstudiantes.removeAt(numero)
  }

  agregarInformacion(){
    const valor = this.plantelesCursados.value;
    if(valor.ano !== '' && valor.plantel !== '' && valor.estado !== '' && valor.ciudad !== '' && valor.calificacion !== '' && valor.grado !== ''){
      this.plantelesEstudiantes.push(
        this.fb.control(
          PlantelesEstudiantes.PlantelesObj(valor)
        )
      );
      for (const key in this.plantelesCursados.controls) {
        if(key !== 'informacion'){
          this.plantelesCursados.controls[key].setValue('')
        }
      }

    }
  }
  get plantelesEstudiantes (){
    return <FormArray>this.plantelesArray.controls.informacion
  }

}
