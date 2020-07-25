import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models';
import { UsuariosService, AdministradorService } from 'src/app/services/administracion';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-detalle-usuario-personalizado',
  templateUrl: './detalle-usuario-personalizado.component.html',
  providers:[UsuariosService,AdministradorService]

})
export class DetalleUsuarioPersonalizadoComponent implements OnInit {


  public datos:Usuario;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:Usuario,
    private dialogRef: MatDialogRef<DetalleUsuarioPersonalizadoComponent>,
    private usuarioSvc:UsuariosService,
    private sharedSvc:SharedService,
    private adminSvc:AdministradorService
  ) {
    this.datos = data;
  }

  ngOnInit(): void {
  }

  activarUsuario(id:number){

    this.usuarioSvc.activarUsuario(id).subscribe(res => {
      this.mensajeYCerrado(res)
    })
  }

  desactivarUsuario(id:number){
    this.usuarioSvc.desactivarUsuario(id).subscribe(res => {
      this.mensajeYCerrado(res)
    })
  }

  restablecerContrasena(id:number){
    this.adminSvc.restablecerContrasena(id).subscribe(res => {
      this.mensajeYCerrado(res)
    })
  }

  private mensajeYCerrado(res:any){
    this.sharedSvc.mensajeSuccessAlerta(res);
      this.dialogRef.close(true)
  }

}
