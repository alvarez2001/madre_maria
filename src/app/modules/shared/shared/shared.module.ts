import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CedulaDirective } from 'src/app/directivas/validacionesAsincronas/cedula.directive';
import { MilesDirective } from 'src/app/directivas/formateadores/miles.directive';


@NgModule({
  declarations: [MilesDirective,
  ],
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule

  ],exports:[ReactiveFormsModule, FormsModule, MilesDirective]
})
export class SharedModule { }
