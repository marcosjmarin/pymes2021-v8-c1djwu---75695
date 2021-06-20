import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MyInterceptor } from './shared/my-interceptor';

import { AppComponent } from './app.component';

import { InicioComponent } from './components/inicio/inicio.component';
import { ArticulosFamiliasComponent } from './components/articulos-familias/articulos-familias.component';
import { MockArticulosFamiliasService } from './services/mock-articulos-familias.service';
import { ArticulosFamiliasService } from './services/articulos-familias.service';
import { MenuComponent } from './components/menu/menu.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { MockArticulosService } from './services/mock-articulos.service';
import { ArticulosService } from './services/articulos.service';
import {
  NgbModule,
  NgbPaginationModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ModalDialogService } from './services/modal-dialog.service';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { EmpresasService } from './services/empresas.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbModalModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'articulosfamilias', component: ArticulosFamiliasComponent },
      { path: 'articulos', component: ArticulosComponent },
      { path: 'empresas', component: EmpresasComponent }
    ])
  ],
  declarations: [
    AppComponent,

    InicioComponent,
    ArticulosFamiliasComponent,
    MenuComponent,
    ArticulosComponent,
    ModalDialogComponent,
    EmpresasComponent
  ],
  entryComponents: [ModalDialogComponent],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
    MockArticulosFamiliasService,
    ArticulosFamiliasService,
    ArticulosService,
    ModalDialogService,
    EmpresasService
  ]
})
export class AppModule {}
