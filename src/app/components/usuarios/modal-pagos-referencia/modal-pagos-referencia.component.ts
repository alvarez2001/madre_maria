import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IncripcionService } from 'src/app/services/incripcion/incripcion.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-modal-pagos-referencia',
  templateUrl: './modal-pagos-referencia.component.html',
  providers:[IncripcionService]
})
export class ModalPagosReferenciaComponent implements OnInit {

  constructor(private sharedSvc:SharedService,private incripSvc:IncripcionService,private dialogRef: MatDialogRef<ModalPagosReferenciaComponent>) { }

  mensualidad!:string;
  inscripcion!:string;
  consejo!:string

  ngOnInit(): void {
  }

  guardarInfo(form:FormGroup){
    this.incripSvc.enviarNumerosReferencia(form.value).subscribe((res:any) => {
      this.sharedSvc.mensajeSuccessAlerta(res)
      this.dialogRef.close(false)
    })
  }

}
