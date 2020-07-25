import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PreescolarStep2 } from 'src/app/models';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Router } from '@angular/router';


interface tipadoArray{
  control:string,value:string
}

@Component({
  selector: 'app-preescolar-step2',
  templateUrl: './preescolar-step2.component.html',
  providers:[IncripcionService]
})
export class PreescolarStep2Component implements OnInit {


  public frecuencia:string[] = [
    'siempre',
    'algunas veces',
    'nunca'
  ];
  public especialistas:tipadoArray[] = [
    {control:'Psicologo',value:'Psicólogo'},
    {control:'Psicopedagogos',value:'Psicopedagogos'},
    {control:'Neurologo',value:'Neurólogo'},
    {control:'Terapista del lenguaje', value:'Terapista del lenguaje'},
    {control:'Otro', value:'Otro'}
  ];


  formOne:FormGroup = new FormGroup({});
  formTwo:FormGroup = new FormGroup({});
  formThree:FormGroup = new FormGroup({});
  formFour:FormGroup = new FormGroup({});
  formFive:FormGroup = new FormGroup({});


  public datos:tipadoArray[] = [];
  public datos2:tipadoArray[] = [];
  public cargado:boolean = false;


  enfermedades:tipadoArray[]=[
    {control:'rubeola',value:'Rubeola'},
    {control:'anemia',value:'Anemia'},
    {control:'toxoplasmosis',value:'Toxoplasmosis'},
    {control:'hipertension',value:'Hipertensión'}
  ];


  constructor(private fb:FormBuilder, private incripSvc:IncripcionService,private sharedSvc:SharedService,private route:Router) {
    this.formularios();
  }

  ngOnInit(): void {

    for (const key in this.formOne.value) {
      const separado = key.split('_')
      this.datos.push({control:key,value:separado[0]})
    }



    for (const key in this.formTwo.value){
      let separado = key.split('_');
      if(separado[0] === 'papa'){
        this.datos2.push({control:key,value:'papá'})
      }
      else if(separado[0] === 'mama'){
        this.datos2.push({control:key,value:'mamá'})
      }else{
        this.datos2.push({control:key,value:separado[0]});
      }

    }



    this.cargado = true;
  }


  guardar(){
    const form1 = this.formOne.value;
    const form2 = this.formTwo.value;
    const form3 = this.formThree.value;
    const form4 = this.formFour.value;
    const form5 = this.formFive.value;


    const dato = PreescolarStep2.preescolarObj(form1,form2,form3,form4,form5)
    const limpieza = dato.eliminar(dato);
    this.incripSvc.registrarDatosPreescolarStep2(limpieza).subscribe((res:any) => {
      this.sharedSvc.mensajeSuccessAlerta(res)
      this.route.navigate(['/formularios']);
    })

  }

  formularios(){
    this.formOne = this.fb.group({
      iglesia_frecuenta:new FormControl('',Validators.required),
      parque_frecuenta:new FormControl('',Validators.required),
      playa_frecuenta:new FormControl('',Validators.required),
      rio_frecuenta:new FormControl('',Validators.required),
      piscina_frecuenta:new FormControl('',Validators.required),
      museos_frecuenta:new FormControl('',Validators.required),
      cine_frecuenta:new FormControl('',Validators.required),
      familiares_frecuenta:new FormControl('',Validators.required),
      amigos_frecuenta:new FormControl('',Validators.required),
    });

    this.formTwo = this.fb.group({
      papa_juega:new FormControl('',Validators.required),
      mama_juega:new FormControl('',Validators.required),
      hermanos_juega:new FormControl('',Validators.required),
      vecinos_juega:new FormControl('',Validators.required),
      desconocidos_juega:new FormControl('',Validators.required),
      sola_juega:new FormControl('',Validators.required)
    });

    this.formThree = this.fb.group({
      especialista:new FormControl('',Validators.required),
      otro:new FormControl({value:'',disabled:true}),
      motivos:new FormControl('',Validators.required)
    });

    this.formThree.controls['especialista'].valueChanges.subscribe(res => {
      if(res === 'Otro'){
        this.activar('otro',this.formThree);
      }else{
        this.desactivar('otro',this.formThree);
      }
    })


    this.formFour = this.fb.group({
      embarazo_prenatales:new FormControl('',Validators.required),
      enfermedad_prenatales:new FormControl(''),
      trabajo_embarazo:new FormControl('',Validators.required),
      tipo_trabajo:new FormControl({value:'',disabled:true}),
      accidente_embarazo:new FormControl('',Validators.required),
      explique_accidente:new FormControl({value:'',disabled:true})
    })

    this.formFour.controls['trabajo_embarazo'].valueChanges.subscribe(res => {
      if(res === 'Si'){
        this.activar('tipo_trabajo',this.formFour)
      }else{
        this.desactivar('tipo_trabajo',this.formFour)
      }
    })

    this.formFour.controls['accidente_embarazo'].valueChanges.subscribe(res => {
      if(res === 'Si'){
        this.activar('explique_accidente',this.formFour);
      }else{
        this.desactivar('explique_accidente',this.formFour);
      }
    })

    this.formFive = this.fb.group({
      tipo_parto:new FormControl('',Validators.required),
      edad_parto:new FormControl('',Validators.required),
      problema_embarazo:new FormControl('',Validators.required),
      explique_problema:new FormControl({value:'',disabled:true})
    });
    this.formFive.controls['problema_embarazo'].valueChanges.subscribe(res => {
      if(res === 'Si'){
        this.activar('explique_problema',this.formFive);
      }else{
        this.desactivar('explique_problema',this.formFive);
      }
    })
  }

  private activar(control:string,form:FormGroup){
    form.controls[control].enable();
  }

  private desactivar(control:string,form:FormGroup){
    form.controls[control].disable();
  }

}
