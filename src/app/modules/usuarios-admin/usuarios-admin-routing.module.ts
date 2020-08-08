import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioUsuarioAdminComponent } from '../../components/administrador/inicio-usuario-admin/inicio-usuario-admin.component';
import { ListarUsuariosComponent } from 'src/app/components/administrador/listar-usuarios/listar-usuarios.component';
import { ListarActivosEstudiantesComponent } from 'src/app/components/administrador/listar-activos-estudiantes/listar-activos-estudiantes.component';

import { ConsultarUsuarioComponent } from "src/app/components/administrador/consultar-usuario/consultar-usuario.component";
import { ModificarUsuarioComponent } from 'src/app/components/administrador/modificar-usuario/modificar-usuario.component';
import { EliminarEstudianteComponent } from "src/app/components/administrador/eliminar-estudiante/eliminar-estudiante.component";
import { ModificarUsuarioDetallesComponent } from 'src/app/components/administrador/modificar-usuario-detalles/modificar-usuario-detalles.component';

const routes: Routes = [
  {
    path:'agregar',
    component:InicioUsuarioAdminComponent
  },
  {
    path:'listar',
    component:ListarUsuariosComponent
  },
  {
    path:'listar-activos',
    component:ListarActivosEstudiantesComponent
  },
  {
    path:'consultar-usuario',
    component:ConsultarUsuarioComponent
  },
  {
    path:'modificar-usuario',
    component:ModificarUsuarioComponent
  },
  {
    path:'modificar',
    component:ModificarUsuarioDetallesComponent
  },
  {
    path:'eliminar-estudiante',
    component:EliminarEstudianteComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosAdminRoutingModule { }
