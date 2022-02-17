import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';


@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
})
export class MenuAdminComponent implements OnInit {

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
