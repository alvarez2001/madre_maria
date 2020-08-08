import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModificarUsuario } from '../modificar-usuario/modificar-usuario.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/administracion';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-usuario-detalles',
  templateUrl: './modificar-usuario-detalles.component.html',
  styleUrls: ['./modificar-usuario-detalles.component.scss'],
  providers:[UsuariosService]
})
export class ModificarUsuarioDetallesComponent implements OnInit, OnDestroy {
  info!: ModificarUsuario;

  private datos!: ModificarUsuario;

  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder,private usuarioSvc:UsuariosService, private sharedSvc:SharedService,private route:Router) {}

  ngOnInit(): void {
    const info:any = sessionStorage.getItem('modificarDato')
    this.info = JSON.parse(info);
    this.datos = Object.assign({}, this.info);
    this.form = this.fb.group({
      nombres: [
        this.datos.nombres,
        [Validators.required, Validators.maxLength(50)],
      ],
      apellidos: [
        this.datos.apellidos,
        [Validators.required, Validators.maxLength(50)],
      ],
      cedula: [
        this.datos.cedula,
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(20),
          Validators.pattern('[0-9]+'),
        ],
      ],
    });
  }

  ngOnDestroy(){
    sessionStorage.removeItem('modificarDato')
  }

  enviarInformacion() {

    const form = this.form;
    const info = this.info;
    if (form.valid) {
      const datos = this.eliminarCedula(form.value, info);

      this.usuarioSvc.modificarUsuarioCedula(datos,this.info.usuario,this.info.estudiante).subscribe(res => {
        this.sharedSvc.mensajeSuccessAlerta(res)
        this.route.navigate(['administrador','usuarios','modificar-usuario'])
      })
    }
  }

  private eliminarCedula(form: ModificarUsuario, info: ModificarUsuario) {
    const infoCedula = info.cedula;
    const formCedula = form.cedula;
    if (infoCedula === formCedula) {
      delete form['cedula'];
    }
    return form;
  }
}
