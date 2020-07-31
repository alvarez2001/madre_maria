import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { BalanceModel, BalanceModelEgreso } from 'src/app/models';
import { razones } from 'src/app/constantes/grados';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  providers:[IncripcionService]
})
export class BalancesComponent implements OnInit {

  dataGuardado:string[] =[
    'Papá',
    'Mamá',
    'Otros'
  ];

  descripcionGuardado:string[] = [
    'Alimentación',
    'Vivienda',
    'Luz',
    'Agua',
    'Teléfono',
    'Medicina',
    'Transporte',
    'Gas',
    'Educación',
    'TV por cable',
    'Internet',
    'Otro'
  ];

  portador:string[] = [];
  descripciones:string[] = []
  razon:string[] = [];

  relacionIngresos:FormGroup = new FormGroup({});
  relacionEgresos:FormGroup = new FormGroup({});

  constructor(private fb:FormBuilder, private incripSvc:IncripcionService, private sharedSvc:SharedService, private router:Router) {
    this.portador = this.dataGuardado
    this.razon = razones;

    this.relacionIngresos = this.fb.group({
      balance:this.fb.array([], [Validators.required, Validators.minLength(1)]),
      portador:new FormControl(''),
      sueldo:new FormControl('0'),
      alimentacion:new FormControl('0'),
      pension:new FormControl('0'),
      eventuales:new FormControl('0'),
      sociales:new FormControl('0'),
      ayuda_familiar:new FormControl('0'),
      informal:new FormControl('0'),
      remesas:new FormControl('0')
    });

    this.relacionEgresos = this.fb.group({
      alimentacion:new FormControl('0',[Validators.required]),
      vivienda:new FormControl('0',[Validators.required]),
      luz:new FormControl('0',[Validators.required]),
      agua:new FormControl('0',[Validators.required]),
      telefono:new FormControl('0',[Validators.required]),
      medicina:new FormControl('0',[Validators.required]),
      transporte:new FormControl('0',[Validators.required]),
      gas:new FormControl('0',[Validators.required]),
      educacion:new FormControl('0',[Validators.required]),
      tv:new FormControl('0',[Validators.required]),
      internet:new FormControl('0',[Validators.required]),
      otros:new FormControl('0',[Validators.required]),
      razon1:new FormControl('',[Validators.required]),
      razon2:new FormControl('',[Validators.required]),
      razon3:new FormControl('',[Validators.required])
    })
  }

  ngOnInit(): void {

  }




  guardarData(){
    const balance = this.relacionEgresos.value;
     balance['alimentacion'] = balance['alimentacion'].replace(',','.')
     balance['vivienda'] = balance['vivienda'].replace(',','.')
     balance['luz'] = balance['luz'].replace(',','.')
     balance['agua'] = balance['agua'].replace(',','.')
     balance['telefono'] = balance['telefono'].replace(',','.')
     balance['medicina'] = balance['medicina'].replace(',','.')
     balance['transporte'] = balance['transporte'].replace(',','.')
     balance['gas'] = balance['gas'].replace(',','.')
     balance['educacion'] = balance['educacion'].replace(',','.')
     balance['tv'] = balance['tv'].replace(',','.')
     balance['internet'] = balance['internet'].replace(',','.')
     balance['otros'] = balance['otros'].replace(',','.')


     if(
      !isNaN(balance['alimentacion']) &&
      !isNaN(balance['vivienda']) &&
      !isNaN(balance['luz']) &&
      !isNaN(balance['agua']) &&
      !isNaN(balance['telefono']) &&
      !isNaN(balance['medicina']) &&
      !isNaN(balance['transporte']) &&
      !isNaN(balance['gas']) &&
      !isNaN(balance['educacion']) &&
      !isNaN(balance['tv']) &&
      !isNaN(balance['internet']) &&
      !isNaN(balance['otros'])
    ){
      const dato:BalanceModel[] = this.relacionIngresos.value.balance;
      const datos = BalanceModelEgreso.balanceObj(this.relacionEgresos.value);
      const datosUnidos = {}
      Object.assign(datosUnidos,datos,{balance:dato});

      this.incripSvc.addBalances(datosUnidos).subscribe(res => {
        this.sharedSvc.mensajeSuccessAlerta(res)
        this.router.navigate(['/formularios'])
      })
    }

  }


  agregarRelacionIngresos(){
     const balance = this.relacionIngresos.value;


     balance['sueldo'] = balance['sueldo'].replace(',','.')
     balance['alimentacion'] = balance['alimentacion'].replace(',','.')
     balance['pension'] = balance['pension'].replace(',','.')
     balance['eventuales'] = balance['eventuales'].replace(',','.')
     balance['sociales'] = balance['sociales'].replace(',','.')
     balance['ayuda_familiar'] = balance['ayuda_familiar'].replace(',','.')
     balance['remesas'] = balance['remesas'].replace(',','.')
     balance['informal'] = balance['informal'].replace(',','.')

    if(
      balance.portador !== '' &&
      !isNaN(balance.sueldo) &&
      !isNaN(balance.alimentacion) &&
      !isNaN(balance.pension) &&
      !isNaN(balance.eventuales) &&
      !isNaN(balance.sociales)  &&
      !isNaN(balance.ayuda_familiar)  &&
      !isNaN(balance.remesas) &&
      !isNaN(balance.informal)
    ){
      delete balance['balance'];
      this.RelacionIngresos.push(this.fb.control(BalanceModel.balanceObj(balance)))
      const datos = this.portador.filter((dato)=>{
        return dato !== balance.portador
      });

      this.portador = datos;


      for (const key in this.relacionIngresos.controls) {
        if(key !== 'balance'){
          this.relacionIngresos.controls[key].setValue('0')
        }
        if(key === 'portador'){
          this.relacionIngresos.controls[key].setValue('')
        }

      }
    }
  }

  removerIngreso(i:number):void{
    const portadorGuardado = this.RelacionIngresos.value[i].portador;
    if(!this.portador.includes(portadorGuardado)){
      this.portador.push(portadorGuardado);
    }


    this.RelacionIngresos.removeAt(i)
  }

  get RelacionIngresos(){
    return <FormArray>this.relacionIngresos.controls.balance;
  }

}
