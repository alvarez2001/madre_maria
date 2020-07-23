import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { DetalleUsuarioComponent } from '../detalle-usuario/detalle-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from "src/app/services/administracion";
import { Usuario, Paginacion } from 'src/app/models';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  providers:[UsuariosService]
})
export class ListarUsuariosComponent implements OnInit {

  public data:Usuario[] = [];
  public existeMayor:boolean = true;
  public paginacion?:Paginacion;

  constructor(private dialog: MatDialog, private usuarioSvc:UsuariosService) {}

  ngOnInit(): void {
    this.buscarUsuarios()
  }



  openDialog(id:number) {
    const dialogRef = this.dialog.open(DetalleUsuarioComponent,
      {
        data:id,
        width:'1200px',
      });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.buscarUsuarios();
    });
  }


  private buscarUsuarios(){
    this.usuarioSvc.buscarTodosEstudiantesInactivos().subscribe(res => {
      if( res.data.length === 0){
        this.existeMayor = false;
      }
      this.data = res.data.map( value => Usuario.UsuarioObj(value))
      this.paginacion = res
    })
  }

}
