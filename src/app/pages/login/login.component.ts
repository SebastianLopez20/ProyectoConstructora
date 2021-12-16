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
     await this.interaction.presentLoading('Ingresando')
     const res = await this.auth.login(this.credenciales.correo, this.credenciales.password).catch(error => {
       console.log(error);
      this.interaction.closeLoading();
       this.interaction.presentToast('Error en credenciales');
       
     })
    
     if(res){
       console.log('res--',res);
       this.interaction.closeLoading();
       this.interaction.presentToast('Ingresado con exito');
       this.router.navigate(['/obreros'])
       

       
     }
        
      
  }

}
