import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoporteComponent } from 'src/app/components/soporte/soporte.component';

const routes: Routes = [
  {
    path:'',
    component:SoporteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoporteTecnicoRoutingModule { }
