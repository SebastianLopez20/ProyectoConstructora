import { AlertController } from '@ionic/angular';
import { FirestorageService } from './../../services/firestorage.service';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { InteractionService } from './../../services/interaction.service';
import { ObreroI } from './../../models/models';

@Component({
  selector: 'app-addobrero',
  templateUrl: './addobrero.component.html',
  styleUrls: ['./addobrero.component.scss'],
})
export class AddobreroComponent implements OnInit {
  newImage = '';
  newFile = '';

  data: ObreroI ={
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    foto: "",
    id : '',
}

lleno :boolean= false;

  constructor (private database: FirestoreService,
              private interaction: InteractionService,
              public firestorageservice: FirestorageService,
              public alertController: AlertController ) { }

  ngOnInit() {}



  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Ingrese los datos completos.',
      cssClass: 'my-custom-class3',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });

    await alert.present();
  }

 async crearNuevoObrero(){
  if(this.data.nombre == '' && this.data.cedula == ''){
    this.presentAlertConfirm()
    this.lleno=false;
  }
  if(this.data.nombre!= '' && this.data.cedula != '' && this.data.telefono != ''){
    this.lleno = true;
  }
   if(this.lleno == true){
    this.interaction.presentLoading('Guardando')
    const path = 'Obreros'
    const name = this.data.nombre
    const res = await this.firestorageservice.uploadImage(this.newFile, path,name)
    this.data.foto= res;



     const id = this.database.getId();
     this.data.id = id;
     this.database.createDoc(this.data, path, id).then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Guardado Correctamente')
        this.data.nombre=null;
        this.data.apellido=null;
        this.data.cedula=null;
        this.data.telefono=null;
        this.data.foto= null;
     })
   }

  }
  async newImageUpload(event: any){
     if (event.target.files && event.target.files[0]){
       this.newFile= event.target.files[0]
      const reader = new FileReader();
      reader.onload = ((image) =>{
        this.newImage = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }



  }

}
