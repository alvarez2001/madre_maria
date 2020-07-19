import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { HermanasPlantel } from './hermanas-plantel';
import { Grados } from 'src/app/constantes/grados';

@Component({
  selector: 'app-datos-hermanas',
  templateUrl: './datos-hermanas.component.html',
  styles: [],
})
export class DatosHermanasComponent implements OnInit {
  hermanas: HermanasPlantel;
  DatosEnviar: HermanasPlantel[];
  grados:any[];
  constructor(private fb: FormBuilder) {
    this.grados = Grados
    this.hermanas = {
      grado: '',
      fullname: '',
    };

    this.DatosEnviar = []
  }

  ngOnInit(): void {
  }

  guardarData(form: FormGroup) {
    console.log(this.DatosEnviar)
  }

  eliminarData(i:number){
    this.DatosEnviar.splice(i,1);
  }

  anadirData(fullname:string,grado:string){
    if(fullname !== '' && grado !== ''){
      const data:HermanasPlantel = {
        fullname:fullname.trim(),
        grado:grado.trim()
      }
      this.DatosEnviar.push(data)
      this.hermanas.fullname = '';
      this.hermanas.grado = '';
    }
  }
}
