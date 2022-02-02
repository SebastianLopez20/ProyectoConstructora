import { VerPedidoComponent } from './Componentes/ver-pedido/ver-pedido.component';
import { DetailsEquipoComponent } from './Componentes/details-equipo/details-equipo.component';

import { ObrerosComponent } from './backend/obreros/obreros.component';
import { AddobreroComponent } from './backend/addobrero/addobrero.component';
import { PedidosComponent } from './Componentes/pedidos/pedidos.component';
import { AddmaterialComponent } from './Componentes/addmaterial/addmaterial.component';
import { AddequipoComponent } from './Componentes/addequipo/addequipo.component';
import { AddherramientaComponent } from './Componentes/addherramienta/addherramienta.component';
import { MaterialesComponent } from './pages/materiales/materiales.component';
import { EquiposComponent } from './pages/equipos/equipos.component';
import { HerramientasComponent } from './pages/herramientas/herramientas.component';
import { MenuBodegueroComponent } from './Componentes/Bodeguero/menu-bodeguero/menu-bodeguero.component';
import { MenuSecretarioComponent } from './Componentes/Secretario/menu-secretario/menu-secretario.component';
import { environment } from './../environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuSecretarioComponent,
    MenuBodegueroComponent,
    HerramientasComponent,
    EquiposComponent,
    MaterialesComponent,
    AddherramientaComponent,
    AddequipoComponent,
    AddmaterialComponent,
    PedidosComponent,
    AddobreroComponent,
    ObrerosComponent,
    DetailsEquipoComponent,
    VerPedidoComponent,

  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    AngularFireStorageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
