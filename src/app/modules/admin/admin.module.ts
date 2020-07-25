import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { InicioAdminComponent } from '../../components/administrador/inicio-admin/inicio-admin.component';
import { UsuariosAdminComponent } from '../../components/administrador/usuarios-admin/usuarios-admin.component';
import { NominasVistaComponent } from '../../components/administrador/nominas-vista/nominas-vista.component';
import { SharedModule } from '../shared/shared/shared.module';
import { PlanillasVistaComponent } from 'src/app/components/administrador/planillas-vista/planillas-vista.component';


@NgModule({
  declarations: [InicioAdminComponent, UsuariosAdminComponent, NominasVistaComponent,PlanillasVistaComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
