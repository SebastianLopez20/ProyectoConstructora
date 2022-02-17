import { InteractionService } from './../../services/interaction.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credenciales = {
    correo: null,
    password: null
  }

  constructor(private auth: AuthService,
              private interaction: InteractionService,
              private router: Router,) { }

  ngOnInit() {}


   async login(){
     const res = await this.auth.login(this.credenciales.correo, this.credenciales.password).catch(error => {
       console.log(error);
       this.interaction.presentToast('Error en credenciales');

     })

     if(res){
        console.log('res--',res);
       const thiscorreo = this.credenciales.correo
      if(thiscorreo == 'bodega@taipelopez.com'){
        await this.interaction.presentLoading('Ingresando')
        this.router.navigate(['/menubodega'])
        this.interaction.closeLoading();
        this.interaction.presentToast('Ingresado con exito');
      }
      if(thiscorreo == 'admin@taipelopez.com'){
        await this.interaction.presentLoading('Ingresando')
        this.router.navigate(['/menu-admin'])
        this.interaction.closeLoading();
        this.interaction.presentToast('Ingresado con exito');
      }
      if(thiscorreo == 'secretaria@taipelopez.com'){
        await this.interaction.presentLoading('Ingresando')
        this.router.navigate(['/menusecre'])
        this.interaction.closeLoading();
        this.interaction.presentToast('Ingresado con exito');
      }

     }


  }


}
