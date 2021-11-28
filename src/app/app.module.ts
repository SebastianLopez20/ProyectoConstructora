import { AjustesComponent } from './backend/ajustes/ajustes.component';

import { MenuObreroComponent } from './Componentes/Obrero/menu-obrero/menu-obrero.component';
import { MenuBodegueroComponent } from './Componentes/Bodeguero/menu-bodeguero/menu-bodeguero.component';
import { MenuSecretarioComponent } from './Componentes/Secretario/menu-secretario/menu-secretario.component';
import { environment } from './../environments/environment';
import { RegistroComponent } from './pages/registro/registro.component';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MenuSecretarioComponent,
    MenuBodegueroComponent,
    MenuObreroComponent,
    AjustesComponent,
    
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
