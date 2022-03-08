import { AlertController } from '@ionic/angular';
import { FirestorageService } from './../../services/firestorage.service';
import { Component, OnInit } from '@angular/core';
import { InteractionService } from './../../services/interaction.service';
import { HerramientaI } from './../../models/models';
import { FirestoreService } from './../../services/firestore.service';

@Component({
  selector: 'app-addherramienta',
  templateUrl: './addherramienta.component.html',
  styleUrls: ['./addherramienta.component.scss'],
})
export class AddherramientaComponent implements OnInit {
  newImage = '';
  newFile = '';
  data: HerramientaI ={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    id: '',
}
lleno: boolean =false;

  constructor(private database: FirestoreService,
              private interaction: InteractionService,
              public firestorageservice: FirestorageService,
              public alertController: AlertController) { }

  ngOnInit() {}
  async crearNuevaHerramienta(){
    if(this.data.nombre == '' && this.data.cantidad==null){
      this.presentAlertConfirm()
      this.lleno=false;
    }
    if(this.data.nombre!= '' && this.data.cantidad!=null){
      this.lleno = true;
    }
    if(this.lleno == true){
      this.interaction.presentLoading('Guardando')
      const path = 'Herramientas';
      const name = this.data.nombre
      const res = await this.firestorageservice.uploadImage(this.newFile, path,name)
     this.data.foto= res;

      const id = this.database.getId();
      this.data.id = id;
      this.database.createDoc(this.data, path, id).then(() => {
         this.interaction.closeLoading();
         this.interaction.presentToast('Guardado Correctamente')
         this.data.nombre=null;
         this.data.descripcion=null;
         this.data.cantidad=null;
         this.data.foto= null;
      })
    }
  }
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
