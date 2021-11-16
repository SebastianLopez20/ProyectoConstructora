import { MenuObreroComponent } from './Componentes/Obrero/menu-obrero/menu-obrero.component';
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
  {path: 'menuobrero', component: MenuObreroComponent}
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
