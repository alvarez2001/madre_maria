import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginSvc:LoginService,
    private router:Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const usuario = this.loginSvc.regresarUsuario()
      let permitir:boolean = false;
       if(usuario && usuario.tipo === next.data.tipoUsuario){
         permitir = true;
       }else{
         permitir = false;
        this.router.navigate(['/'])
       }
    return permitir;
  }

}
