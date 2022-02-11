import { InteractionService } from './../../../services/interaction.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-secretario',
  templateUrl: './menu-secretario.component.html',
  styleUrls: ['./menu-secretario.component.scss'],
})
export class MenuSecretarioComponent implements OnInit {

  constructor(private auth: AuthService,
              private interaction: InteractionService,
              private router: Router) { }

  ngOnInit() {
    const hoy = new Date();
    const idhoy = hoy.getFullYear() + '-' + hoy.getMonth() + '-' + hoy.getDate();
    console.log("fecha", idhoy);
    console.log("fecha", hoy);



  }
  async logout(){
    await this.auth.logout();
      this.interaction.presentToast('Sesion Cerrada')
      this.router.navigate(['login']);

    }

}
