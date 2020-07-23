import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styles: [
  ]
})
export class InicioAdminComponent implements OnInit {

  nombres:any;
  constructor(private sharedSvc:SharedService, private route: ActivatedRoute, private loginSvc:LoginService) {
    this.sharedSvc.PaginaCurrent(this.route.snapshot.data.pagina)
    const nombresApellidos = this.loginSvc.regresarUsuario();
    this.nombres = nombresApellidos.nombres +' '+ nombresApellidos.apellidos;
  }

  ngOnInit(): void {
  }

}
