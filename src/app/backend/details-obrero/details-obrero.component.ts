import { InteractionService } from './../../services/interaction.service';
import { ObreroI } from './../../models/models';
import { Component, Input, OnInit } from '@angular/core';
import { FirestorageService } from './../../services/firestorage.service';
import { FirestoreService } from './../../services/firestore.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-obrero',
  templateUrl: './details-obrero.component.html',
  styleUrls: ['./details-obrero.component.scss'],
})
export class DetailsObreroComponent implements OnInit {
  newImage = '';
  newFile = '';
  path = 'Obreros/';
  newEquipo : ObreroI={
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    foto: '',
    id: '',


  }

  @Input() team: ObreroI;
  constructor(private ModalController: ModalController,
              private database: FirestoreService,
              public firestorageservice: FirestorageService,
              private interaction: InteractionService) { }

  ngOnInit() {console.log('esto', this.team);}

  Cerrar(){
    this.ModalController.dismiss();
    }
    async editar() {
      const path = 'Obreros';
      const name = this.team.nombre;
      if(this.newImage){
        const res = await this.firestorageservice.uploadImage(this.newFile, path,name)
        this.team.foto= res;
      }
      console.log('elemento -> ', this.team);
      console.log('path',this.path);
      this.database.updateDoc(this.team, this.path, this.team.id);
      this.interaction.presentToast("Datos Actualizados");
      this.Cerrar();


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
