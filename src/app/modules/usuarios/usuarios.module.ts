import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';

import { RegistroEstudianteComponent } from 'src/app/components/usuarios/registro-estudiante/registro-estudiante.component';
import { LoginComponent } from '../../components/usuarios/login/login.component';

import { SharedModule } from '../shared/shared/shared.module';
import { FormulariosComponent } from '../../components/usuarios/formularios/formularios.component';
import { HomeComponent } from '../../components/usuarios/home/home.component';





@NgModule({
  declarations: [
    RegistroEstudianteComponent,
    LoginComponent,
    FormulariosComponent,
    HomeComponent,


  ],
  imports: [CommonModule, UsuariosRoutingModule, SharedModule,]
})
export class UsuariosModule {}
