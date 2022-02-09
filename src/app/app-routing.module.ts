import { VerAsistenciaComponent } from './pages/ver-asistencia/ver-asistencia.component';
import { AsistenciaComponent } from './pages/asistencia/asistencia.component';
import { VerPedidoComponent } from './Componentes/ver-pedido/ver-pedido.component';
import { PedidosComponent } from './Componentes/pedidos/pedidos.component';

import { ObrerosComponent } from './backend/obreros/obreros.component';
import { AddobreroComponent } from './backend/addobrero/addobrero.component';
import { AddmaterialComponent } from './Componentes/addmaterial/addmaterial.component';
import { AddequipoComponent } from './Componentes/addequipo/addequipo.component';
import { AddherramientaComponent } from './Componentes/addherramienta/addherramienta.component';
import { MaterialesComponent } from './pages/materiales/materiales.component';
import { EquiposComponent } from './pages/equipos/equipos.component';
import { HerramientasComponent } from './pages/herramientas/herramientas.component';
import { MenuSecretarioComponent } from './Componentes/Secretario/menu-secretario/menu-secretario.component';
import { MenuBodegueroComponent } from './Componentes/Bodeguero/menu-bodeguero/menu-bodeguero.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs/operators';
import { canActivate } from '@angular/fire/compat/auth-guard';


const uidAdmin = 'lXciElVmN5UbB2vwy4dGkiRxf3p1';
const uidBodega = 'ZRhhqF2A27SvWuJKtXuXO0K7gw33';
const uidSecretaria= 'GAdPax7A0lR5lrxVVEtrK09stVQ2';
const onlyAdmin = () => map((user: any) => !!user && (user.uid === uidAdmin));
const onlyBodega = () => map ((user : any) => !!user && (user.uid === uidBodega));
const onlySecre = () => map ((user : any) => !!user && (user.uid === uidSecretaria));



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'menubodega', component: MenuBodegueroComponent, canActivate: [AngularFireAuthGuard], ...canActivate(onlyBodega)},
  { path: 'menusecre', component: MenuSecretarioComponent, canActivate: [AngularFireAuthGuard], ...canActivate(onlySecre)},
  { path: 'asistencia', component: AsistenciaComponent, canActivate: [AngularFireAuthGuard], ...canActivate(onlySecre)},
  { path: 'verasistencia', component: VerAsistenciaComponent, canActivate: [AngularFireAuthGuard], ...canActivate(onlySecre)},
  {path: 'herramientas', component: HerramientasComponent, canActivate: [AngularFireAuthGuard], ...canActivate(onlyBodega)},
  {path: 'equipos', component: EquiposComponent, canActivate: [AngularFireAuthGuard], ...canActivate(onlyBodega)},
  {path: 'materiales', component: MaterialesComponent, canActivate: [AngularFireAuthGuard], ...canActivate(onlyBodega)},
  {path: 'addherramientas', component: AddherramientaComponent, canActivate: [AngularFireAuthGuard], ...canActivate(onlyBodega)},
  {path: 'addequipos', component: AddequipoComponent, canActivate: [AngularFireAuthGuard], ...canActivate(onlyBodega)},
  {path: 'addmateriales', component: AddmaterialComponent, canActivate: [AngularFireAuthGuard], ...canActivate(onlyBodega)},
  {path: 'pedido', component: PedidosComponent, canActivate: [AngularFireAuthGuard], ...canActivate(onlyBodega)},
  {path: 'verpedidos', component: VerPedidoComponent, canActivate: [AngularFireAuthGuard], ...canActivate(onlyBodega)},
  {path: 'addobreros', component: AddobreroComponent, ...canActivate(onlyAdmin)},
  {path: 'obreros', component: ObrerosComponent, ...canActivate(onlyAdmin)},
  {path: '**', redirectTo:'login',pathMatch:'full'},
  {path: '', redirectTo:'login',pathMatch:'full'}



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
