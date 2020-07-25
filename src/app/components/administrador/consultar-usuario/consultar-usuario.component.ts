import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/services/administracion';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/app/constantes/global';
import { DetalleUsuarioPersonalizadoComponent } from '../detalle-usuario-personalizado/detalle-usuario-personalizado.component';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models';

@Component({
  selector: 'app-consultar-usuario',
  templateUrl: './consultar-usuario.component.html',
  providers:[AdministradorService]
})
export class ConsultarUsuarioComponent implements OnInit {

  cedulaInformacion:string = '';
  constructor(private adminSvc:AdministradorService,private dialog:MatDialog) { }

  ngOnInit(): void {

  }

  informacionUsuario(){
    const dato = {cedula:this.cedulaInformacion};
    if(dato.cedula !== ''){
      this.adminSvc.informacionPersonalUsuario(dato).subscribe(res => {
        this.openDialog(res)
      })
    }
  }

  openDialog(data:Usuario) {
    const dialogRef = this.dialog.open(DetalleUsuarioPersonalizadoComponent,
      {
        data:data,
        width:'1200px',
      });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
