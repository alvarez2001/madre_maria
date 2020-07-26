import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroEstudianteComponent } from 'src/app/components/usuarios/registro-estudiante/registro-estudiante.component';
import { LoginComponent } from 'src/app/components/usuarios/login/login.component';
import { FormulariosComponent } from 'src/app/components/usuarios/formularios/formularios.component';
import { HomeComponent } from 'src/app/components/usuarios/home/home.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('src/app/modules/formularios/formulario/formulario.module').then( m => m.FormularioModule),
    component:FormulariosComponent,
    canActivate:[AuthGuard],
    data:{pagina:'Procesos de Solicitud',tipoUsuario:'Estudiante'}
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
