import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Nacionalidad } from 'src/app/constantes/grados';

export interface modeloReferencias {
  /* INSCRIPCION */
  referencia_bancaria_inscripcion: number;
  fullname_titular_inscripcion: string;
  cedula_titular_inscripcion: string;
  fecha_bancaria_inscripcion: Date;
  archivo_inscripcion: File;

  /* MENSUALIDAD */

  referencia_bancaria_mensualidad: number;
  fullname_titular_mensualidad: string;
  cedula_titular_mensualidad: string;
  fecha_bancaria_mensualidad: Date;
  archivo_mensualidad: File;

  /* CONSEJO */
  referencia_bancaria_consejo: number;
  fullname_titular_consejo: string;
  cedula_titular_consejo: string;
  fecha_bancaria_consejo: Date;
  archivo_consejo: File;
}

@Component({
  selector: 'app-modal-pagos-referencia',
  templateUrl: './modal-pagos-referencia.component.html',
  providers: [IncripcionService],
})
export class ModalPagosReferenciaComponent implements OnInit {
  nacionalidad = Nacionalidad;
  @ViewChild('fileMensualidad')
  fileMensualidad!: ElementRef;

  @ViewChild('fileInscripcion') fileInscripcion!: ElementRef;
  @ViewChild('fileConsejo') fileConsejo!: ElementRef;




  constructor(
    private sharedSvc: SharedService,
    private incripSvc: IncripcionService,
    private dialogRef: MatDialogRef<ModalPagosReferenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  formInscripcion: FormGroup = this.fb.group({
    /*  TRANSFERENCIA INSCRIPCION */
    referencia_bancaria_inscripcion: [
      '',
      [Validators.required, Validators.pattern('[0-9]+')],
    ],
    fullname_titular_inscripcion: ['', [Validators.required]],
    nacionalidad_titular_inscripcion: ['', Validators.required],
    cedula_titular_inscripcion: [
      '',
      [Validators.required, Validators.pattern('[0-9]+')],
    ],
    fecha_bancaria_inscripcion: ['', [Validators.required]],
    //archivo_inscripcion:['',[Validators.required]],
  });

  formMensualidad: FormGroup = this.fb.group({
    /* TRANSFERENCIA MENSUALIDAD */
    referencia_bancaria_mensualidad: [
      '',
      [Validators.required, Validators.pattern('[0-9]+')],
    ],
    fullname_titular_mensualidad: ['', [Validators.required]],
    nacionalidad_titular_mensualidad: ['', Validators.required],
    cedula_titular_mensualidad: [
      '',
      [Validators.required, Validators.pattern('[0-9]+')],
    ],
    fecha_bancaria_mensualidad: ['', [Validators.required]],
    //archivo_mensualidad:['',[Validators.required]],
  });

  formConsejo: FormGroup = this.fb.group({
    /* TRANSFERENCIA CONSEJO EDUCATIVO */

    referencia_bancaria_consejo: [
      '',
      [Validators.required, Validators.pattern('[0-9]+')],
    ],
    fullname_titular_consejo: ['', [Validators.required]],
    nacionalidad_titular_consejo: ['', Validators.required],
    cedula_titular_consejo: [
      '',
      [Validators.required, Validators.pattern('[0-9]+')],
    ],
    fecha_bancaria_consejo: ['', [Validators.required]],
    //archivo_consejo:['',[Validators.required]]
  });

  mensualidad!: string;
  inscripcion!: string;
  consejo!: string;

  ngOnInit(): void {

  }



  setearArchivo(archivo: File) {}



  guardarDatos() {
    const {
      referencia_bancaria_inscripcion,
      fullname_titular_inscripcion,
      nacionalidad_titular_inscripcion,
      cedula_titular_inscripcion,
      fecha_bancaria_inscripcion,
    } = this.formInscripcion.value;


    const {
      referencia_bancaria_mensualidad,
      fullname_titular_mensualidad,
      nacionalidad_titular_mensualidad,
      cedula_titular_mensualidad,
      fecha_bancaria_mensualidad,
    } = this.formMensualidad.value;


    const {
      referencia_bancaria_consejo,
      fullname_titular_consejo,
      nacionalidad_titular_consejo,
      cedula_titular_consejo,
      fecha_bancaria_consejo,
    } = this.formConsejo.value;

    const data = new FormData();
    if(!this.data.consejo){
      data.append('archivo_consejo', this.fileConsejo?.nativeElement?.files[0]);
    }
    data.append('archivo_inscripcion', this.fileInscripcion.nativeElement.files[0]);
    data.append('archivo_mensualidad', this.fileMensualidad.nativeElement.files[0]);
    /* inscripcion */
    data.append('referencia_bancaria_inscripcion', referencia_bancaria_inscripcion);
    data.append('fullname_titular_inscripcion', fullname_titular_inscripcion);
    data.append('cedula_titular_inscripcion', nacionalidad_titular_inscripcion+cedula_titular_inscripcion);
    data.append('fecha_bancaria_inscripcion', fecha_bancaria_inscripcion)
    /* mensualidad */
    data.append('referencia_bancaria_mensualidad', referencia_bancaria_mensualidad)
    data.append('fullname_titular_mensualidad',fullname_titular_mensualidad);
    data.append('fecha_bancaria_mensualidad', fecha_bancaria_mensualidad);
    data.append('cedula_titular_mensualidad', nacionalidad_titular_mensualidad+cedula_titular_mensualidad);
    /* consejo */

    if(!this.data.consejo){
      data.append('referencia_bancaria_consejo',referencia_bancaria_consejo);
      data.append('fullname_titular_consejo',fullname_titular_consejo)
      data.append('cedula_titular_consejo',nacionalidad_titular_consejo+cedula_titular_consejo);
      data.append('fecha_bancaria_consejo',fecha_bancaria_consejo)
    }



  this.incripSvc.addTransferencias(data).subscribe((res:any) => {
    this.sharedSvc.mensajeSuccessAlerta(res)
    this.dialogRef.close(false)
  });
  }

  guardarInfo() {




  }
}
