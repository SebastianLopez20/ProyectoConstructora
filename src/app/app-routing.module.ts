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
const onlyAdmin = () => map((user: any) => !!user && (user.uid === uidAdmin));


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'menubodega', component: MenuBodegueroComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'menusecre', component: MenuSecretarioComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'herramientas', component: HerramientasComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'equipos', component: EquiposComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'materiales', component: MaterialesComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'addherramientas', component: AddherramientaComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'addequipos', component: AddequipoComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'addmateriales', component: AddmaterialComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'pedido', component: PedidosComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'verpedidos', component: VerPedidoComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'addobreros', component: AddobreroComponent, ...canActivate(onlyAdmin)},
  {path: 'obreros', component: ObrerosComponent, ...canActivate(onlyAdmin)},
  //{path: '**', redirectTo:'login',pathMatch:'full'},
  {path: '', redirectTo:'login',pathMatch:'full'}



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
