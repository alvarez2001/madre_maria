import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class PasosGuard implements CanActivate {
  constructor(private loginSvc: LoginService, private router:Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.permitir(next);
  }

  private permitir(next: ActivatedRouteSnapshot): boolean {
    const pasoActual = sessionStorage.getItem('paso');
    const descifrarTipoSoli = sessionStorage.getItem('tipoSolicitud');
    if (pasoActual && descifrarTipoSoli) {
      const descifrado = atob(pasoActual);
      const descifradoSoli = atob(descifrarTipoSoli);
      const pasoCurrent = next.data.pasoCurrent;
      if (pasoCurrent === parseInt(descifrado)) {
        return true;
      }else{
        this.router.navigate(['/formularios'])
        return false
      }
    }

    return true
  }
}
