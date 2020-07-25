import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NominasVistaComponent } from 'src/app/components/administrador/nominas-vista/nominas-vista.component';

const routes: Routes = [
  {
    path:'',
    component:NominasVistaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NominasRoutingModule { }
