import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
/*   {
    path:'inicio',
    loadChildren:()=>import('src/app/modules/principal/principal.module').then( m => m.PrincipalModule )
  }, */
  {
    path:'',
    loadChildren:()=>import('src/app/modules/usuarios/usuarios.module').then( m => m.UsuariosModule )
  },
  {
    path:'administrador',
    loadChildren:()=>import('src/app/modules/administrador/administrador.module').then( m => m.AdministradorModule),
    data:{pagina:'Procesos de Solicitud',tipoUsuario:'Administrador'},
    canActivate:[AuthGuard]
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
