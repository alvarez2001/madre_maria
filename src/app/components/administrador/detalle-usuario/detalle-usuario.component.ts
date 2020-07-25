import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListarUsuariosComponent } from '../listar-usuarios/listar-usuarios.component';
import { UsuariosService } from 'src/app/services/administracion';
import { Usuario, DetalleUsuario } from 'src/app/models';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  providers:[UsuariosService]
})
export class DetalleUsuarioComponent implements OnInit {
  usuario!:DetalleUsuario;
  nombresApellidos:string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{cedula:string, aceptar:boolean, idEstudiante:number},
    private dialogRef: MatDialogRef<ListarUsuariosComponent>,
    private usuarioSvc:UsuariosService,
    private sharedSvc:SharedService
    ) {}

  ngOnInit(): void {
    this.usuarioSvc.buscarUsuarioCedula(this.data.cedula).subscribe(res => {
      this.usuario = res;
      this.nombresApellidos = res.representante.apellidos+', '+res.representante.nombres;
    })
  }

  activarUsuario(){

    this.usuarioSvc.activarUsuario(this.data.idEstudiante).subscribe(res => {
      this.sharedSvc.mensajeSuccessAlerta(res);
      this.dialogRef.close(true)
    })
  }

  desactivarUsuario(){
    this.usuarioSvc.desactivarUsuario(this.data.idEstudiante).subscribe(res => {
      this.sharedSvc.mensajeSuccessAlerta(res);
      this.dialogRef.close(true)
    })
  }



}
