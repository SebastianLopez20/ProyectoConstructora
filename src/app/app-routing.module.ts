import { MaterialesComponent } from './pages/materiales/materiales.component';
import { EquiposComponent } from './pages/equipos/equipos.component';
import { HerramientasComponent } from './pages/herramientas/herramientas.component';
import { AjustesComponent } from './backend/ajustes/ajustes.component';

import { MenuSecretarioComponent } from './Componentes/Secretario/menu-secretario/menu-secretario.component';
import { MenuBodegueroComponent } from './Componentes/Bodeguero/menu-bodeguero/menu-bodeguero.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent},
  { path: 'menubodega', component: MenuBodegueroComponent},
  { path: 'menusecre', component: MenuSecretarioComponent},
  {path: 'ajustes', component: AjustesComponent},
  {path: 'herramientas', component: HerramientasComponent},
  {path: 'equipos', component: EquiposComponent},
  {path: 'materiales', component: MaterialesComponent},
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
