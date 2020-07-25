import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PreescolarStep1 } from 'src/app/models';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';

interface datos {
  value:string,
  data:string
}

@Component({
  selector: 'app-preescolar-step1',
  templateUrl: './preescolar-step1.component.html',
  providers:[IncripcionService]
})
export class PreescolarStep1Component implements OnInit {

  public cantidades:number[] = [
    0,1,2,3,4,5,6,7,8,9,10
  ];
  public quienCuida:datos[] = [
    {value: 'papa', data:'Papá'},
    {value: 'mama', data:'Mamá'},
    {value: 'hermanos', data:'Hermanos'},
    {value: 'abuelos', data:'Abuelos'},
    {value: 'parientes', data:'Parientes'},
    {value: 'otros', data:'Otros'}
  ];

  public relaciones:datos[] = [
    {value:'no posee',data:'No posee'},
    {value:'armonica',data:'Armónica'},
    {value:'cordial',data:'Cordial'},
    {value:'tensa',data:'Tensa'},
    {value:'agresiva',data:'Agresiva'}
  ];

  public tiposJuegos:datos[] = [
    {value:'aire libre', data:'Aire libre'},
    {value:'mesa', data:'Mesa'},
    {value:'televisión', data:'Televisión'},
    {value:"tic's", data:"Tic's"},
    {value:'no juego', data:'No juego'},
    {value:'otros', data:'Otros'},
  ];

  public formOne:FormGroup = new FormGroup({});

  public formTwo:FormGroup = new FormGroup({});

  public formThree:FormGroup = new FormGroup({});

  public formFord : FormGroup = new FormGroup({});

  public formFive:FormGroup = new FormGroup({});
  constructor( private fb:FormBuilder,private incripSvc:IncripcionService,private route:Router,private sharedSvc:SharedService) {

  }

  ngOnInit(): void {
    this.crearFormularios();
  }


  guardar(){
    const form1 = this.formOne.value;
    const form2 = this.formTwo.value;
    const form3 = this.formThree.value;
    const form4 = this.formFord.value;
    const form5 = this.formFive.value;




    const forms = PreescolarStep1.PreescolarObj(form1,form2,form3,form4,form5)


    this.incripSvc.registrarDatosPreescolarStep1(forms.eliminar(forms)).subscribe((res: any) => {
      this.sharedSvc.mensajeSuccessAlerta(res)
      this.route.navigate(['/formularios']);
    })


  }



  private activar(control:string, form:FormGroup){
    form.controls[control].enable()
  }

  private deshabilitar(control:string, form:FormGroup){
    form.controls[control].disable()
  }



  private crearFormularios(){
    this.formOne = this.fb.group({
      dormitorios_cantidad:new FormControl('',Validators.required),
      cocina_cantidad:new FormControl('',Validators.required),
      comedor_cantidad:new FormControl('',Validators.required),
      banos_cantidad:new FormControl('',Validators.required),
      garajes_cantidad:new FormControl('',Validators.required),
      depositos_cantidad:new FormControl('',Validators.required),
      lavandero_cantidad:new FormControl('',Validators.required),
      patios_cantidad:new FormControl('',Validators.required),
    });

    this.formTwo = this.fb.group({
      quien_cuida_estudiante:new FormControl('', Validators.required),
      otros:new FormControl({value:'', disabled:true})
    });

    this.formTwo.controls['quien_cuida_estudiante'].valueChanges.subscribe(res => {
      if(res === this.quienCuida[5].value){
        this.activar('otros',this.formTwo)
      }else{
        this.deshabilitar('otros',this.formTwo)
      }
    })


    this.formThree = this.fb.group({
      asistido_preescolar:new FormControl('',Validators.required),
      nombre_preescolar:new FormControl({value:'',disabled:true}),
      orientacion_estudiante:new FormControl('',Validators.required),
      como_orientacion:new FormControl({value:'',disabled:true}),
    })

    this.formThree.controls['asistido_preescolar'].valueChanges.subscribe(res => {
      if(res === 'Si'){
        this.activar('nombre_preescolar',this.formThree);
      }else{
        this.deshabilitar('nombre_preescolar',this.formThree);
      }
    });

    this.formThree.controls['orientacion_estudiante'].valueChanges.subscribe(res => {
      if(res === 'Si'){
        this.activar('como_orientacion',this.formThree);
      }else{
        this.deshabilitar('como_orientacion',this.formThree);
      }
    })

    this.formFord = this.fb.group({
      papa_relacion:new FormControl('',Validators.required),
      mama_relacion:new FormControl('',Validators.required),
      hermano_relacion:new FormControl('',Validators.required),
      hermana_relacion:new FormControl('',Validators.required),
      abuela_relacion:new FormControl('',Validators.required),
      familiares_relacion:new FormControl('',Validators.required),
      amigos_relacion:new FormControl('',Validators.required),
      perros_relacion:new FormControl('',Validators.required),
    })

    this.formFive = this.fb.group({
      juego_estudiante:new FormControl('',Validators.required)
    })


  }




}
