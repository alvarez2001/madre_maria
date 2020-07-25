import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioUsuarioAdminComponent } from '../../components/administrador/inicio-usuario-admin/inicio-usuario-admin.component';
import { ListarUsuariosComponent } from 'src/app/components/administrador/listar-usuarios/listar-usuarios.component';
import { ListarActivosEstudiantesComponent } from 'src/app/components/administrador/listar-activos-estudiantes/listar-activos-estudiantes.component';

import { ConsultarUsuarioComponent } from "src/app/components/administrador/consultar-usuario/consultar-usuario.component";

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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosAdminRoutingModule { }
