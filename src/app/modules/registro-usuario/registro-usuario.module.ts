import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroUsuarioRoutingModule } from './registro-usuario-routing.module';
import { RegistroEstudianteComponent } from 'src/app/components/usuarios/registro-estudiante/registro-estudiante.component';
import { SharedModule } from '../shared/shared/shared.module';


@NgModule({
  declarations: [RegistroEstudianteComponent],
  imports: [
    CommonModule,
    SharedModule,
    RegistroUsuarioRoutingModule
  ]
})
export class RegistroUsuarioModule { }
