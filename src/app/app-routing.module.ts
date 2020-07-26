import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { QuicklinkStrategy } from "ngx-quicklink";
import { HomeComponent } from './components/usuarios/home/home.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    data:{pagina:'Inicio'}
  },
  {
    path:'formularios',
    loadChildren:()=>import('src/app/modules/usuarios/usuarios.module').then( m => m.UsuariosModule ),
    data:{tipoUsuario:'Administrador'},
    canActivate:[AuthGuard]
  },
  {
    path:'administrador',
    loadChildren:()=>import('src/app/modules/administrador/administrador.module').then( m => m.AdministradorModule),
    data:{pagina:'Procesos de Solicitud',tipoUsuario:'Administrador'},
    canActivate:[AuthGuard]
  },
  {
    path: 'registro',
    loadChildren:()=>import('src/app/modules/registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioModule ),
    data: { pagina: 'Registro estudiante' },
  },
  {
    path: 'login',
    loadChildren:()=>import('src/app/modules/login/login.module').then(m => m.LoginModule ),
    data: { pagina: 'Login estudiante' },
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
      preloadingStrategy:QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
