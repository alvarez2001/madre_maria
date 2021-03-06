import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared/shared.module';
import { LoginComponent } from 'src/app/components/usuarios/login/login.component';
import { ModalInhabilitadoComponent } from 'src/app/components/modal-inhabilitado/modal-inhabilitado.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
