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
import { FormGroup } from '@angular/forms';
import { RegistroEstudiante } from 'src/app/components/usuarios/registro-estudiante/registroEstudiante';
import { ConstantPool } from '@angular/compiler';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
})
export class RegistroEstudianteComponent implements OnInit {
  existeEstudiante: boolean = true;
  existeRepresentante: boolean = true;
  formModel: RegistroEstudiante;

  grados: string[] = [];
  nacionalidad: any[] = [];
  lateraldad: string[] = [];
  tipoSangre: string[] = [];
  factorRH: string[] = [];
  idRepresentante: number | undefined;

  constructor(
    private router: Router,
    public sharedSvc: SharedService,
    private loginSvc: LoginService,
    private route: ActivatedRoute
  ) {
    this.grados = Grados;
    this.nacionalidad = Nacionalidad;
    this.lateraldad = lateralidad;
    this.tipoSangre = tiposSangre;
    this.factorRH = factorRh;
    this.formModel = {
      tipo_solicitud: '',
      grado_solicitud: '',
      nacionalidad_estudiante: '',
      cedula_estudiante: '',
      nombres_estudiante: '',
      apellidos_estudiante: '',
      lugar_nacimiento: '',
      fecha_nacimiento: '',
      estado: '',
      pais: '',
      email_estudiante: '',

      password: '',

      nacionalidad_representante: '',
      cedula_representante: '',
      nombres_representante: '',
      apellidos_representante: '',
      parentesco: '',
      celular_representante: '',
      email: '',
      ocupacion_representante: '',
      tlf_representante: '',

      lateralidad: '',
      /* opcionales */

      celular_estudiante: '',
      sangre_estudiante: '',
      factor_rh: '',
      guarderia: '',
    };
  }

  ngOnInit(): void {
    /* REPRESENTANTE */
    this.sharedSvc.dataRepresentante.subscribe((res: any) => {
      this.idRepresentante = res.id;
      this.formModel.apellidos_representante = res.apellidos;
      this.formModel.celular_representante = res.celular;
      this.formModel.email = res.email;
      this.formModel.nombres_representante = res.apellidos;
      this.formModel.ocupacion_representante = res.ocupacion;
      this.formModel.parentesco = res.parentesco;
      this.formModel.tlf_representante = res.tlf_local;
    });

    this.sharedSvc.estadoVerificacionRepresentante.subscribe(
      (res: boolean) => (this.existeRepresentante = res)
    );

    /* ESTUDIANTE */
    this.sharedSvc.estadoVerificacionEstudiante.subscribe((res: boolean) => {
      this.existeEstudiante = res;
    });
    this.sharedSvc.PaginaCurrent(this.route.snapshot.data.pagina);
  }

  formRegistro(form: FormGroup) {
    if (form.valid) {
      this.sharedSvc.lanzarCarga(true);
      if (this.idRepresentante && this.existeRepresentante) {
        this.loginSvc
          .registrarEstudiante(this.formModel, this.idRepresentante)
          .subscribe((res) => {
            this.registroEstudiantes(res, form);

          });
      } else {
        this.loginSvc
          .registrarEstudianteRepresentante(this.formModel)
          .subscribe((res) => {
            this.registroEstudiantes(res, form);
          });
      }
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
  cambiado(event: any) {
    if (event === 'Prescolar') {
      this.formModel.grado_solicitud = Grados[0];
    } else {
      this.formModel.grado_solicitud = '';
    }
  }

  evitarCambiado(event: any) {
    if (this.formModel.tipo_solicitud == 'Prescolar' && event !== Grados[0]) {
      this.formModel.grado_solicitud = '';
    }
  }
}
