import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
import { FormGroup, NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { LoginModel } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  formLogin:LoginModel;


  constructor(private route:ActivatedRoute,private router:Router, private sharedSvc:SharedService, private loginSvc:LoginService) {
    this.formLogin = {
      cedula:'',
      password:''
    }

   }

  ngOnInit(): void {
    this.sharedSvc.PaginaCurrent(this.route.snapshot.data.pagina)
  }

  Loguearse(form:FormGroup){
    if(form.valid){
      this.sharedSvc.lanzarCarga(true);
      this.loginSvc.loginEstudiante(this.formLogin).subscribe(res => {

        if(res.usuario.tipo === 'Administrador'){
          this.router.navigate(['/administrador'])
        }
        else{
          this.router.navigate(['/formularios'])
        }
        this.sharedSvc.lanzarCarga(false);
      },err => {this.sharedSvc.lanzarCarga(false)})
    }
  }

}
