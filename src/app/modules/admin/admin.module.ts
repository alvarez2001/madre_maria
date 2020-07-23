import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { InicioAdminComponent } from '../../components/administrador/inicio-admin/inicio-admin.component';
import { UsuariosAdminComponent } from '../../components/administrador/usuarios-admin/usuarios-admin.component';


@NgModule({
  declarations: [InicioAdminComponent, UsuariosAdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
