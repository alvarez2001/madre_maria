import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioUsuarioAdminComponent } from '../../components/administrador/inicio-usuario-admin/inicio-usuario-admin.component';
import { ListarUsuariosComponent } from 'src/app/components/administrador/listar-usuarios/listar-usuarios.component';

const routes: Routes = [
  {
    path:'agregar',
    component:InicioUsuarioAdminComponent
  },
  {
    path:'listar',
    component:ListarUsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosAdminRoutingModule { }
