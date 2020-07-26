import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/components/usuarios/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { pagina: 'Login estudiante' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
