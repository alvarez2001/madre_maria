import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Grados, parentesco } from 'src/app/constantes/grados';
import { HermanaModel, EstructuraClass } from 'src/app/models';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { EstructuraFamiliarClass } from 'src/app/models/EstructuraClass';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-datos-hermanas',
  templateUrl: './datos-hermanas.component.html',
  styles: [],
  providers:[IncripcionService]
})
export class DatosHermanasComponent implements OnInit {
  grados: string[];
  parentesco: string[];

  segundoFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  terceroFormGroup: FormGroup;
  constructor(private route:Router,private fb: FormBuilder, private incripSvc:IncripcionService, private sharedSvc:SharedService) {
    /* INICIOS VARIABLES */
    this.parentesco = parentesco;
    this.grados = Grados;

    /* INICIOS FORM */
    this.firstFormGroup = this.fb.group({
      hermanas: this.fb.array([], []),
      grado: new FormControl(''),
      fullname: new FormControl(''),
    });

    this.segundoFormGroup = this.fb.group({
      estructura_familiar: this.fb.array(
        [],
        [Validators.required, Validators.min(1)]
      ),
      nombres: new FormControl(''),
      parentesco: new FormControl(''),
      edad: new FormControl(''),
      ocupacion: new FormControl(''),
      ingreso: new FormControl(''),
      nivel: new FormControl(''),
      instituto: new FormControl(''),
      mensualidad: new FormControl(''),
    });
    this.terceroFormGroup = this.fb.group({
      hermanos:new FormControl('', [Validators.required, Validators.min(0)]),
      nro_hermanas:new FormControl('', [Validators.required, Validators.min(0)]),
      viven:new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  ngOnInit(): void {

  }

  guardarData() {
    const { hermanas } = this.firstFormGroup.value;
    const { estructura_familiar } = this.segundoFormGroup.value;
    const { hermanos, nro_hermanas, viven } = this.terceroFormGroup.value;


    const datos = {
      hermanas,
      estructura_familiar,
      hermanos,
      nro_hermanas,
      viven
    };


    const datosTransform = EstructuraFamiliarClass.EstructuraFamiliarObj(datos);
    console.log(datosTransform);
    this.incripSvc.registrarDatosFamiliares(datosTransform).subscribe(res => {
      this.sharedSvc.mensajeSuccessAlerta(res)
      this.route.navigate(['/formularios']);
    })
  }

  /* ESTRUCTURA FAMILIAR  */

  eliminarDataEstructura(i: number) {
    this.EstructuraFamiliar.removeAt(i);
  }

  anadirDataEstructura() {
    const datos = this.segundoFormGroup.value;
    if (datos.nombres !== '' && datos.edad !== '' && datos.parentesco !== '')
      this.EstructuraFamiliar.push(
        this.fb.control(
          EstructuraClass.EstructuraObj(this.segundoFormGroup.value)
        )
      );

      for (const key in this.segundoFormGroup.controls) {
        if(key !== 'estructura_familiar'){
          this.segundoFormGroup.controls[key].setValue('')
        }
      }
  }

  get EstructuraFamiliar() {
    return <FormArray>this.segundoFormGroup.controls.estructura_familiar;
  }

  /* HERMANAS QUE ESTUDIAN EN EL PLANTEL */

  eliminarData(i: number) {
    this.Hermanas.removeAt(i);
  }

  anadirData(fullname: string, grado: string) {

    if (fullname !== '' && grado !== '') {
      this.Hermanas.push(
        this.fb.control(HermanaModel.hermanaObj(this.firstFormGroup.value))
      );
      for (const key in this.firstFormGroup.controls) {
        if(key !== 'hermanas'){
          this.firstFormGroup.controls[key].setValue('')
        }
      }
    }
  }

  get Hermanas() {
    return <FormArray>this.firstFormGroup.controls.hermanas;
  }
}
