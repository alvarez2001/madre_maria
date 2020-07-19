import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroEstudianteComponent } from 'src/app/components/usuarios/registro-estudiante/registro-estudiante.component';
import { LoginComponent } from 'src/app/components/usuarios/login/login.component';
import { Formulario1Component } from 'src/app/components/usuarios/formulario1/formulario1.component';
import { FormulariosComponent } from 'src/app/components/usuarios/formularios/formularios.component';

const routes: Routes = [
  {
    path:'formularios',
    loadChildren:()=>import('src/app/modules/formularios/formulario/formulario.module').then( m => m.FormularioModule),
    component:FormulariosComponent,
    data:{pagina:'Procesos Académicos'}
  },
  {
    path:'formularios/1',
    component:Formulario1Component,
    data:{pagina:'Formulario 1era parte'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { pagina: 'Login estudiante' },
  },
  {
    path: 'registro',
    component: RegistroEstudianteComponent,
    data: { pagina: 'Registro estudiante' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
