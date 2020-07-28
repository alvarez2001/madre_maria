import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MilesDirective } from 'src/app/directivas/formateadores/miles.directive';
import { ModalInhabilitadoComponent } from 'src/app/components/modal-inhabilitado/modal-inhabilitado.component';


@NgModule({
  declarations: [MilesDirective,ModalInhabilitadoComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule

  ],exports:[ReactiveFormsModule, FormsModule, MilesDirective,ModalInhabilitadoComponent]
})
export class SharedModule { }
