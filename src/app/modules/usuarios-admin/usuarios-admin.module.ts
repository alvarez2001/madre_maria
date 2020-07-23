import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosAdminRoutingModule } from './usuarios-admin-routing.module';
import { InicioUsuarioAdminComponent } from '../../components/administrador/inicio-usuario-admin/inicio-usuario-admin.component';
import { ListarUsuariosComponent } from '../../components/administrador/listar-usuarios/listar-usuarios.component';
import { MaterialModule } from '../shared/material/material.module';
import { DetalleUsuarioComponent } from '../../components/administrador/detalle-usuario/detalle-usuario.component';
import { SharedModule } from '../shared/shared/shared.module';


@NgModule({
  declarations: [InicioUsuarioAdminComponent, ListarUsuariosComponent,DetalleUsuarioComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    UsuariosAdminRoutingModule
  ]
})
export class UsuariosAdminModule { }
