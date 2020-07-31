import { Component, OnInit } from '@angular/core';
import { Usuario, Paginacion } from 'src/app/models';
import { UsuariosService } from 'src/app/services/administracion';
import { MatDialog } from '@angular/material/dialog';
import { DetalleUsuarioComponent } from '../detalle-usuario/detalle-usuario.component';

@Component({
  selector: 'app-listar-activos-estudiantes',
  templateUrl: '../listar-usuarios/listar-usuarios.component.html',
  providers:[UsuariosService]
})
export class ListarActivosEstudiantesComponent implements OnInit {

  public data:Usuario[] = [];
  public existeMayor:boolean = true;
  public paginacion!:Paginacion;
  estado:string = 'activos';

  constructor(private dialog: MatDialog, private usuarioSvc:UsuariosService) {}

  ngOnInit(): void {
    this.buscarUsuarios()
  }



  openDialog(cedula:string, idEstudiante:number) {
    const dialogRef = this.dialog.open(DetalleUsuarioComponent,
      {
        data:{cedula, aceptar:false, idEstudiante},
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
    this.usuarioSvc.buscarEstudiantesActivos().subscribe(res => {
      if( res.data.length === 0){
        this.existeMayor = false;
      }
      this.data = res.data.map( value => Usuario.UsuarioObj(value))
      this.paginacion = res
    })
  }

}
