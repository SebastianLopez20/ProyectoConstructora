import { AuthService } from './../../../services/auth.service';
import { InteractionService } from './../../../services/interaction.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu-bodeguero',
  templateUrl: './menu-bodeguero.component.html',
  styleUrls: ['./menu-bodeguero.component.scss'],
})
export class MenuBodegueroComponent implements OnInit {

  constructor(private auth: AuthService,
    private interaction: InteractionService,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() {}


  async logout(){
    await this.auth.logout();
      this.interaction.presentToast('Sesion Cerrada')
      this.router.navigate(['login']);

    }
    async presentAlertConfirm() {
      const alert = await this.alertController.create({
        header: '¿Desea Cerrar Sesión?',
        cssClass: 'my-alert-logout',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Aceptar ',
            cssClass: 'primary',
            handler: () => {
              this.logout();
            }
          }
        ]
      });

      await alert.present();
    }

}
