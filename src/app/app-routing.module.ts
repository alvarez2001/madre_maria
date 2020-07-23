import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
/*   {
    path:'inicio',
    loadChildren:()=>import('src/app/modules/principal/principal.module').then( m => m.PrincipalModule )
  }, */
  {
    path:'',
    loadChildren:()=>import('src/app/modules/usuarios/usuarios.module').then( m => m.UsuariosModule )
  },
  /* {
    path:'administrador',
    loadChildren:()=>import('src/app/modules/administrador/administrador.module').then( m => m.AdministradorModule)
  }, */
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
