import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Grados,
  Nacionalidad,
  lateralidad,
  tiposSangre,
  factorRh,
} from 'src/app/constantes/grados';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  RegistroEstudiante,
  RegistroEstudiantesClass,
} from 'src/app/components/usuarios/registro-estudiante/registroEstudiante';
import { LoginService } from 'src/app/services/login/login.service';
import { debounce, debounceTime, tap, map, first, distinctUntilChanged } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
})
export class RegistroEstudianteComponent implements OnInit {
  existeEstudiante: boolean = true;
  existeRepresentante: boolean = true;
  formModel!: RegistroEstudiante;

  grados: string[] = [];
  nacionalidad: any[] = [];
  lateraldad: string[] = [];
  tipoSangre: string[] = [];
  factorRH: string[] = [];
  idRepresentante: number | undefined;

  form: FormGroup;

  constructor(
    private router: Router,
    public sharedSvc: SharedService,
    private loginSvc: LoginService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.grados = Grados;
    this.nacionalidad = Nacionalidad;
    this.lateraldad = lateralidad;
    this.tipoSangre = tiposSangre;
    this.factorRH = factorRh;

    this.form = this.fb.group({
      tipo_solicitud: new FormControl('', [Validators.required]),
      grado_solicitud: new FormControl('', [Validators.required]),
      nacionalidad_estudiante: new FormControl('', [Validators.required]),
      cedula_estudiante: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      nombres_estudiante: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      apellidos_estudiante: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      lugar_nacimiento: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      estado: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      pais: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      password: new FormControl('', [Validators.required]),

      nacionalidad_representante: new FormControl('', [Validators.required]),

      cedula_representante: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),

      nombres_representante: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      apellidos_representante: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      parentesco: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      celular_representante: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      email: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      ocupacion_representante: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      tlf_representante: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      fecha_nacimiento: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      lateralidad: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),

      /* OPCIONALES */
      email_estudiante: new FormControl({ value: '', disabled: true }),
      celular_estudiante: new FormControl({ value: '', disabled: true }),
      sangre_estudiante: new FormControl({ value: '', disabled: true },[
        Validators.required,
      ]),
      factor_rh: new FormControl({ value: '', disabled: true },[
        Validators.required,
      ]),
      guarderia: new FormControl({ value: '', disabled: true }),
      casa_hogar: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),


      usuario:new FormControl({value:'', disabled:true})
    });
  }

  ngOnInit(): void {
    /* REPRESENTANTE */
    this.sharedSvc.dataRepresentante.subscribe((res: any) => {
      this.idRepresentante = res.id;
      this.form.controls['apellidos_representante'].setValue(res.apellidos);
      this.form.controls['celular_representante'].setValue(res.celular);
      this.form.controls['email'].setValue(res.email);
      this.form.controls['nombres_representante'].setValue(res.apellidos);
      this.form.controls['ocupacion_representante'].setValue(res.ocupacion);
      this.form.controls['parentesco'].setValue(res.parentesco);
      this.form.controls['tlf_representante'].setValue(res.tlf_local);
    });

    this.representante();
    this.validarCIrepresentante();

    /* ESTUDIANTE */
    this.errores();
    this.sharedSvc.PaginaCurrent(this.route.snapshot.data.pagina);

    this.validarCIestudiante();

    this.cambiado();
  }

  formRegistro() {
      const datos:any = RegistroEstudiantesClass.registroObj(this.form.value);

      for (const propName in datos) {
        if (datos[propName] === null || datos[propName] === undefined || datos[propName] === '') {
          delete datos[propName];
        }
      }

      this.sharedSvc.lanzarCarga(true);
      if (this.idRepresentante && this.existeRepresentante) {

        this.loginSvc
          .registrarEstudiante(datos, this.idRepresentante)
          .subscribe((res) => {
            this.registroEstudiantes(res, this.form);
          });
      } else {
        this.loginSvc
          .registrarEstudianteRepresentante(datos)
          .subscribe((res) => {
            this.registroEstudiantes(res, this.form);
          });
      }

  }

  registroEstudiantes(res: any, form: FormGroup) {
    this.sharedSvc.mensajeSuccessAlerta(res);
    this.sharedSvc.lanzarCarga(false);
    this.router.navigate(['/login']);
    window.scrollTo({
      top: 0,
    });
    form.reset();
  }

  private activar(control: string[]): void {
    control.forEach((element) => {
      this.form.controls[element].enable();
    });
  }

  private desactivar(control: string[]): void {
    control.forEach((element) => {
      this.form.controls[element].disable();
    });
  }

  private errores() {
    this.sharedSvc.estadoVerificacionEstudiante.subscribe((res: boolean) => {
      this.existeEstudiante = res;
      const array: string[] = [
        'nombres_estudiante',
        'apellidos_estudiante',
        'lugar_nacimiento',
        'estado',
        'pais',
        'password',
        'fecha_nacimiento',
        'lateralidad',
        'email_estudiante',
        'celular_estudiante',
        'sangre_estudiante',
        'factor_rh',
        'guarderia',
        'casa_hogar',
      ];
      if (!res) {
        this.activar(array);
      }else{
        this.desactivar(array);
      }
    });
  }

  private representante() {
    this.sharedSvc.estadoVerificacionRepresentante.subscribe((res: boolean) => {
      this.existeRepresentante = res;
      const arrayRepre = [
        'apellidos_representante',
        'celular_representante',
        'email',
        'nombres_representante',
        'ocupacion_representante',
        'parentesco',
        'tlf_representante',
      ];
      if (!res) {
        this.activar(arrayRepre);
      }
      if (res) {
        this.desactivar(arrayRepre);
      }
    });
  }

  getControls(control:string) : AbstractControl{
    return this.form.controls[control]
  }

  cambiado() {
    let revisado: boolean;
    this.form.controls['tipo_solicitud'].valueChanges.subscribe((res) => {
      if (res !== 'Preescolar') {
        this.form.controls['grado_solicitud'].setValue('');
      }
      if (res === 'Preescolar' && !revisado) {
        revisado = true;
        this.form.controls['grado_solicitud'].setValue(Grados[0]);
      } else {
        revisado = false;
      }

      this.form.controls['guarderia'].setErrors(null)

      if(res === 'Preescolar'){
        this.getControls('guarderia').setErrors({required:true})

      }


    });

    this.form.controls['grado_solicitud'].valueChanges.subscribe((res) => {
      if (res === Grados[0] && !revisado) {
        this.form.controls['tipo_solicitud'].setValue('Preescolar');
      }
      if (
        this.form.controls['tipo_solicitud'].value === 'Preescolar' &&
        res !== Grados[0]
      ) {
        this.form.controls['grado_solicitud'].setValue(Grados[0]);
      }
    });

    this.form.controls['nacionalidad_estudiante'].valueChanges.subscribe(
      (res) => {
        this.form.controls['cedula_estudiante'].enable();
      }
    );

    this.form.controls['nacionalidad_representante'].valueChanges.subscribe(
      (res) => {
        this.form.controls['cedula_representante'].enable();
      }
    );
  }

  get estudiante() {
    return this.form.controls['cedula_estudiante'] as FormControl;
  }
  get nacionalidadEstudiante() {
    return this.form.controls['nacionalidad_estudiante'] as FormControl;
  }

  get representanteCI() {
    return this.form.controls['cedula_representante'] as FormControl;
  }
  get nacionalidadrepresentante() {
    return this.form.controls['nacionalidad_representante'] as FormControl;
  }


  private validarCIestudiante() {
    this.estudiante.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap((cedula) => {
          this.estudiante.markAsPending();
        })
      )
      .subscribe((res) => {
        const data = {
          nacionalidad_estudiante: this.nacionalidadEstudiante.value,
          cedula_estudiante: res,
        };
        if(res !== '' && res !== null && res){
          this.verificarCedulaEstudiante(data);
          this.form.controls['usuario'].setValue(res)
        }
      });
  }

  private validarCIrepresentante(){
    this.representanteCI.valueChanges.pipe(
      debounceTime(1000),
      tap( cedula => {
        this.representanteCI.markAsPending();
      })
    ).subscribe(res => {
      const data = {
        nacionalidad_representante: this.nacionalidadrepresentante.value,
        cedula_representante: res,
      };

      if(res !== '' && res !== null && res){
        this.verificarCedulaRepresentante(data);
      }
    })
  }

  private verificarCedulaEstudiante(data: any) {
    this.sharedSvc.lanzarCarga(true);
    this.loginSvc.verificarCedulaEstudiante(data).subscribe((res) => {
      const tipo = typeof res;
      this.estudiante.markAsPending({ onlySelf: false });
      this.sharedSvc.lanzarCarga(false);
      if (tipo === 'object') {
        this.sharedSvc.verificarEstudiante(true);
        this.estudiante.setErrors({ usuarioExistente: true });
        this.sharedSvc.mostrarAlertaError('La cédula de la estudiante ya se encuentra registrada en el sistema')
      } else {
        this.sharedSvc.verificarEstudiante(false);
        this.estudiante.setErrors(null);

      }


    });
  }

  private verificarCedulaRepresentante(data: any) {
    this.sharedSvc.lanzarCarga(true);
    this.loginSvc.verificarCedulaRepresentante(data).subscribe((res) => {
      const tipo = typeof res;
      this.sharedSvc.lanzarCarga(false);
      this.representanteCI.markAsPending({ onlySelf: false });
      if (tipo === 'object') {
        this.sharedSvc.compartirInfoRepresentante(res);
        this.sharedSvc.verificarRepresentante(true);
        this.representanteCI.setErrors(null);
      } else {
        this.representanteCI.setErrors(null);
        this.sharedSvc.verificarRepresentante(false);
      }
    });
  }
}
