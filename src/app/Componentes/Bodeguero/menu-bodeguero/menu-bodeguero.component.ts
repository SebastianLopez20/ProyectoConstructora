import { AuthService } from './../../../services/auth.service';
import { InteractionService } from './../../../services/interaction.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bodeguero',
  templateUrl: './menu-bodeguero.component.html',
  styleUrls: ['./menu-bodeguero.component.scss'],
})
export class MenuBodegueroComponent implements OnInit {

  constructor(private auth: AuthService,
    private interaction: InteractionService,
    private router: Router) { }

  ngOnInit() {}


  async logout(){
    await this.auth.logout();
      this.interaction.presentToast('Sesion Cerrada')
      this.router.navigate(['login']);

    }

}
