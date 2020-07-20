import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';

import { RegistroEstudianteComponent } from 'src/app/components/usuarios/registro-estudiante/registro-estudiante.component';
import { LoginComponent } from '../../components/usuarios/login/login.component';

import { SharedModule } from '../shared/shared/shared.module';
import { Formulario1Component } from '../../components/usuarios/formulario1/formulario1.component';
import { FormulariosComponent } from '../../components/usuarios/formularios/formularios.component';





@NgModule({
  declarations: [
    RegistroEstudianteComponent,
    LoginComponent,
    Formulario1Component,
    FormulariosComponent,


  ],
  imports: [CommonModule, UsuariosRoutingModule, SharedModule,]
})
export class UsuariosModule {}
