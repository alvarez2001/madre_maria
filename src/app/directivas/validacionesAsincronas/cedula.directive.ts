import { Directive, Input } from '@angular/core';
import {
  NG_ASYNC_VALIDATORS,
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { map } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared/shared.service';

@Directive({
  selector: '[cedula]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: CedulaDirective,
      multi: true,
    }
  ]
})
export class CedulaDirective implements AsyncValidator {
  @Input('cedula') cedula:any;

  constructor(private loginSvc:LoginService, private sharedSvc:SharedService) {}



  validate(control: AbstractControl ):Observable<ValidationErrors | null> {


    /*
    nacionalidad_estudiante
    cedula_estudiante
    */

    if(this.cedula.tipo === 'representante'){
      const data = {
        nacionalidad_representante:this.cedula.nacionalidad,
        cedula_representante : control.value
      }
      this.sharedSvc.lanzarCarga(true)
      return this.loginSvc.verificarCedulaRepresentante(data).pipe(
        map(
          (data:any) => {
            const tipo = typeof data;
            this.sharedSvc.lanzarCarga(false)
            if(tipo === 'object'){
              this.sharedSvc.compartirInfoRepresentante(data);
              this.sharedSvc.verificarRepresentante(true);
              return null;
            }
            this.sharedSvc.verificarRepresentante(false);
            return null;
          }
        )
      )
    }

    if(this.cedula.tipo === 'estudiante'){
      const data = {
        nacionalidad_estudiante:this.cedula.nacionalidad,
        cedula_estudiante : control.value
      }
      this.sharedSvc.lanzarCarga(true)
      return this.loginSvc.verificarCedulaEstudiante(data).pipe(
        map(
          (data:any) => {
            const tipo = typeof data;
            this.sharedSvc.lanzarCarga(false)
            if(tipo === 'object'){
              this.sharedSvc.verificarEstudiante(true);
              return {cedulaEstudiante:true};
            }
            this.sharedSvc.verificarEstudiante(false);
            return null;
          }
        )
      )
    }


    throw new Error('Method not implemented.')
  }
}
