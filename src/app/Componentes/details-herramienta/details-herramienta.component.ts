import { Component, Input, OnInit } from '@angular/core';
import { FirestorageService } from './../../services/firestorage.service';
import { FirestoreService } from './../../services/firestore.service';
import { ModalController } from '@ionic/angular';
import { HerramientaI } from 'src/app/models/models';

@Component({
  selector: 'app-details-herramienta',
  templateUrl: './details-herramienta.component.html',
  styleUrls: ['./details-herramienta.component.scss'],
})
export class DetailsHerramientaComponent implements OnInit {
  newImage = '';
  newFile = '';
  path = 'Herramientas/';
  newHerramienta:HerramientaI ={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    id: '',
  }
  @Input()team: HerramientaI;
  constructor(private ModalController: ModalController,
              private database: FirestoreService,
              public firestorageservice: FirestorageService) { }

  ngOnInit() {
    console.log('esto', this.team);
  }

  Cerrar(){
    this.ModalController.dismiss();
    }
    async editar() {
      const path = 'Equipos';
      const name = this.team.nombre;
      if(this.newImage){
        const res = await this.firestorageservice.uploadImage(this.newFile, path,name)
        this.team.foto= res;
      }
      console.log('elemento -> ', this.team);
      console.log('path',this.path)
      this.database.updateDoc(this.team, this.path, this.team.id)

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



