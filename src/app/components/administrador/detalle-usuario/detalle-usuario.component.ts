import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListarUsuariosComponent } from '../listar-usuarios/listar-usuarios.component';
import { UsuariosService } from 'src/app/services/administracion';
import { Usuario } from 'src/app/models';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  providers:[UsuariosService]
})
export class DetalleUsuarioComponent implements OnInit {
  usuario!:Usuario;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:number,
    private dialogRef: MatDialogRef<ListarUsuariosComponent>,
    private usuarioSvc:UsuariosService,
    private sharedSvc:SharedService
    ) { }

  ngOnInit(): void {
    this.usuarioSvc.buscarUsuario(this.data).subscribe(res => {
      this.usuario = res;
    })
  }

  activarUsuario(){
    this.usuarioSvc.activarUsuario(this.usuario.id).subscribe(res => {
      this.sharedSvc.mensajeSuccessAlerta(res);
      this.dialogRef.close(true)
    })
  }



}
