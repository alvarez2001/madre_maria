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
  public paginacion!:Paginacion;
  public estado:string = 'inactivos';

  constructor(private dialog: MatDialog, private usuarioSvc:UsuariosService) {}

  ngOnInit(): void {
    this.buscarUsuarios()
  }



  openDialog(cedula:string,idEstudiante:number) {
    const dialogRef = this.dialog.open(DetalleUsuarioComponent,
      {
        data:{cedula, aceptar:true,idEstudiante},
        width:'1200px',
      });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.buscarUsuarios();
    });
  }

  recibirPaginacion(paginate:Paginacion){
    this.data = paginate.data.map( result => Usuario.UsuarioObj(result));
    this.paginacion = paginate;

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
