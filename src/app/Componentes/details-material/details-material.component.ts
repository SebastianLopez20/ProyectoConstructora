import { InteractionService } from './../../services/interaction.service';
import { MaterialI, HerramientaI } from './../../models/models';
import { FirestorageService } from './../../services/firestorage.service';
import { FirestoreService } from './../../services/firestore.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-material',
  templateUrl: './details-material.component.html',
  styleUrls: ['./details-material.component.scss'],
})
export class DetailsMaterialComponent implements OnInit {
  newImage = '';
  newFile = '';
  path = 'Materiales/';
  newEquipo : MaterialI={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    id: '',
  }

  @Input() team: HerramientaI;
  constructor(private ModalController: ModalController,
              private database: FirestoreService,
              public firestorageservice: FirestorageService,
              private interaction: InteractionService) { }

  ngOnInit() { console.log('esto', this.team);}
  Cerrar(){
    this.ModalController.dismiss();
    }
    async editar() {
      const path = 'Herramientas';
      const name = this.team.nombre;
      if(this.newImage){
        const res = await this.firestorageservice.uploadImage(this.newFile, path,name)
        this.team.foto= res;
      }
      console.log('elemento -> ', this.team);
      console.log('path',this.path)
      this.database.updateDoc(this.team, this.path, this.team.id)
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
