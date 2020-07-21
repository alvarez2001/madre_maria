import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { parentesco, tipoVivienda, tenenciaVivienda, techoVivienda, pisoVivienda, tipoTransporte } from 'src/app/constantes/grados';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { Direcciones } from 'src/app/models';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  providers:[IncripcionService]
})
export class DireccionesComponent implements OnInit {
  formCasoEmergencia: FormGroup ;
  formTipoVivienda: FormGroup ;
  formMedioTransporte: FormGroup ;
  parentesco:Array<string> = [];



  tipovivienda:string[] = tipoVivienda;
  tenencia:string[] = tenenciaVivienda;
  techoVivienda:string[] = techoVivienda;
  pisoVivienda: string[] = pisoVivienda;
  medioTransporte:string[] = tipoTransporte;



  Nuevoparentesco:string = '';
  otroParentesco:string = '';

  constructor(private fb: FormBuilder, private incrip:IncripcionService) {
    this.parentesco = parentesco


    this.formMedioTransporte = this.fb.group({
      /* DATOS MEDIO DE TRANSPORTE */
      tipo_transporte: new FormControl('', [Validators.required]),
      marca_vehiculo: new FormControl(''),
      ano_vehiculo: new FormControl(''),
      modelo_vehiculo: new FormControl(''),
      placa_vehiculo: new FormControl(''),
      color: new FormControl(''),
      responsable_vehiculo: new FormControl(''),
      cedula_transporte: new FormControl(''),
      celular_transporte: new FormControl(''),
    });



    this.formTipoVivienda = this.fb.group({
      /* TIPO DE VIVIENDA */
      tipo_vivienda: new FormControl('', [Validators.required]),
      tenencia: new FormControl('', [Validators.required]),
      piso: new FormControl('', [Validators.required]),
      techo: new FormControl('', [Validators.required]),
      agua: new FormControl('', [Validators.required]),
      electricidad: new FormControl('', [Validators.required]),
      cloacas: new FormControl('', [Validators.required]),
      gas: new FormControl('', [Validators.required]),
      aseo: new FormControl('', [Validators.required]),
      telefono_vivienda: new FormControl('', [Validators.required]),
      celular_vivienda: new FormControl('', [Validators.required]),
      internet_vivienda: new FormControl('', [Validators.required]),
      tvcable_vivienda: new FormControl('', [Validators.required]),
      computador: new FormControl('', [Validators.required]),
      otros: new FormControl(''),
    });



    this.formCasoEmergencia = this.fb.group({
      /* EMERGENCIA */
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      parentesco: new FormControl('', [Validators.required]),
      telefono: new FormControl(''),
      celular: new FormControl('', [Validators.required]),
    });


  }

  ngOnInit(): void {
    this.valoresCambiantes();
  }

  guardarDatos(){
    console.log('Form 1 ->', this.formCasoEmergencia.value)
    console.log('Form 2 ->', this.formTipoVivienda.value)
    console.log('Form 3 ->', this.formMedioTransporte.value)

    const datosIngresar = {};
    Object.assign(datosIngresar, this.formCasoEmergencia.value, this.formTipoVivienda.value,this.formMedioTransporte.value)


    const datosModel = Direcciones.DireccionesObj(datosIngresar);

    console.log('datos Model ->', datosModel)
    this.incrip.addEmergencia(datosModel).subscribe(res => {
      console.log(res)
    })

  }


  valoresCambiantes(){
    this.formCasoEmergencia.controls['parentesco'].valueChanges.subscribe(parentesco => {
      this.otroParentesco = parentesco;
    });

  }
}
