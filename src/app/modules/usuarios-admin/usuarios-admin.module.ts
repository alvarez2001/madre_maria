import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosAdminRoutingModule } from './usuarios-admin-routing.module';
import { InicioUsuarioAdminComponent } from '../../components/administrador/inicio-usuario-admin/inicio-usuario-admin.component';
import { ListarUsuariosComponent } from '../../components/administrador/listar-usuarios/listar-usuarios.component';
import { MaterialModule } from '../shared/material/material.module';
import { DetalleUsuarioComponent } from '../../components/administrador/detalle-usuario/detalle-usuario.component';
import { SharedModule } from '../shared/shared/shared.module';
import { PaginacionComponent } from '../../components/administrador/paginacion/paginacion.component';
import { ListarActivosEstudiantesComponent } from '../../components/administrador/listar-activos-estudiantes/listar-activos-estudiantes.component';
import { ConsultarUsuarioComponent } from '../../components/administrador/consultar-usuario/consultar-usuario.component';
import { DetalleUsuarioPersonalizadoComponent } from '../../components/administrador/detalle-usuario-personalizado/detalle-usuario-personalizado.component';
import { ModificarUsuarioComponent } from '../../components/administrador/modificar-usuario/modificar-usuario.component';
import { ModificarUsuarioDetallesComponent } from '../../components/administrador/modificar-usuario-detalles/modificar-usuario-detalles.component';
import { EliminarEstudianteComponent } from '../../components/administrador/eliminar-estudiante/eliminar-estudiante.component';


@NgModule({
  declarations: [InicioUsuarioAdminComponent, ListarUsuariosComponent,DetalleUsuarioComponent, PaginacionComponent, ListarActivosEstudiantesComponent, ConsultarUsuarioComponent, DetalleUsuarioPersonalizadoComponent, ModificarUsuarioComponent, ModificarUsuarioDetallesComponent, EliminarEstudianteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    UsuariosAdminRoutingModule
  ]
})
export class UsuariosAdminModule { }
