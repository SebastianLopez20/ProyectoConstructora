import { InteractionService } from './../../../services/interaction.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu-secretario',
  templateUrl: './menu-secretario.component.html',
  styleUrls: ['./menu-secretario.component.scss'],
})
export class MenuSecretarioComponent implements OnInit {

  constructor(private auth: AuthService,
              private interaction: InteractionService,
              private router: Router,
              public alertController: AlertController
              ) { }

  ngOnInit() {
    const hoy = new Date();
    const idhoy = hoy.getFullYear() + '-' + hoy.getMonth() + '-' + hoy.getDate();
    console.log("fecha", idhoy);
    console.log("fecha", hoy);



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
  async logout(){
    await this.auth.logout();
      this.interaction.presentToast('Sesion Cerrada')
      this.router.navigate(['login']);

    }

}
