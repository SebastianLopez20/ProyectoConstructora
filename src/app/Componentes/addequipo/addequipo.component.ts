import { Component, OnInit } from '@angular/core';
import { FirestorageService } from './../../services/firestorage.service';
import { InteractionService } from './../../services/interaction.service';
import { Equipos } from './../../models/models';
import { FirestoreService } from './../../services/firestore.service';

@Component({
  selector: 'app-addequipo',
  templateUrl: './addequipo.component.html',
  styleUrls: ['./addequipo.component.scss'],
})
export class AddequipoComponent implements OnInit {

  newImage = '';
  newFile = '';
  data: Equipos ={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    fechacompra: '',
    id: '',
}

  constructor(private database: FirestoreService,
              private interaction: InteractionService,
              public firestorageservice: FirestorageService) { }

  ngOnInit() {}
  async crearNuevoEquipo(){
    this.interaction.presentLoading('Guardando')
     const path = 'Equipos';
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
        this.data.descripcion=null;
        this.data.foto= null;
     })
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
