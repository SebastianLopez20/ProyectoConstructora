import { Router } from '@angular/router';
import { InteractionService } from './services/interaction.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  login: boolean = false;
  constructor(private auth: AuthService,
    private interaction: InteractionService,
    private router: Router) {

      this.auth.stateUser().subscribe(res => {
        if(res){
          console.log('esta loguieado');
          this.login = true;
          
        }else{
          console.log('no esta logueado');
          this.login = false;
        }
      })
    }

  

  logout(){
    this.auth.logout();
    this.interaction.presentToast('Sesion Cerrada')
    this.router.navigate(['/login'])

  }
}
