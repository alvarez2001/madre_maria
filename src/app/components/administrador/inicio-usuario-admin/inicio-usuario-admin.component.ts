import { Component, OnInit } from '@angular/core';
import { Nacionalidad } from 'src/app/constantes/grados';
import { AdministradorService } from "src/app/services/administracion";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataAdmin } from 'src/app/models';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-inicio-usuario-admin',
  templateUrl: './inicio-usuario-admin.component.html',
  providers:[AdministradorService]
})
export class InicioUsuarioAdminComponent implements OnInit {

  public nacionalidad:{letraIdentificacion:string, identificacion:string}[] = Nacionalidad;

  public formAdmin:FormGroup = new FormGroup({});

  constructor(private adminSvc:AdministradorService, private fb:FormBuilder, private sharedSvc:SharedService) {

    this.formAdmin = this.fb.group({
      nombres:new FormControl('',Validators.required),
      apellidos:new FormControl('',Validators.required),
      nacionalidad:new FormControl('',Validators.required),
      cedula:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      status:new FormControl(1,Validators.required),
      celular:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    });

  }


  ngOnInit(): void {
  }


  guardarAdmin(){
    const dato = DataAdmin.dataObj(this.formAdmin.value)

    this.adminSvc.registrarUsuarioAdmin(dato).subscribe(res => {
      this.sharedSvc.mensajeSuccessAlerta(res)
      this.formAdmin.reset();
    })
  }

}
