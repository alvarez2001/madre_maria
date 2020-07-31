import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/usuarios/inicio/inicio.component';
import { HeaderUsuarioComponent } from './components/usuarios/header-usuario/header-usuario.component';
import { MenuUsuarioComponent } from './components/usuarios/menu-usuario/menu-usuario.component';
import { FooterUsuarioComponent } from './components/usuarios/footer-usuario/footer-usuario.component';
import { SharedService } from './services/shared/shared.service';

import { InterceptorPrimary } from './services/interceptor/interceptor-principal.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login/login.service';
import { MaterialModule } from './modules/shared/material/material.module';
import { MensajeModalComponent } from './mensaje-modal/mensaje-modal.component';
import { PasosGuard } from './guards/pasos.guard';
import { AuthGuard } from './guards/auth.guard';
import { SharedModule } from './modules/shared/shared/shared.module';
import { QuicklinkModule } from 'ngx-quicklink';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ModalInhabilitadoComponent } from './components/modal-inhabilitado/modal-inhabilitado.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderUsuarioComponent,
    MenuUsuarioComponent,
    FooterUsuarioComponent,
    MensajeModalComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    SharedService,
    LoginService,
    PasosGuard,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorPrimary,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
