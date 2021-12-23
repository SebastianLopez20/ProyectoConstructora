import { FirestorageService } from './../../services/firestorage.service';
import { Component, OnInit } from '@angular/core';
import { InteractionService } from './../../services/interaction.service';
import { Materiales } from './../../models/models';
import { FirestoreService } from './../../services/firestore.service';

@Component({
  selector: 'app-addmaterial',
  templateUrl: './addmaterial.component.html',
  styleUrls: ['./addmaterial.component.scss'],
})
export class AddmaterialComponent implements OnInit {
  newImage = '';
  newFile = '';
  data: Materiales ={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    unidadmedida: '',
    id: '',
}


  constructor(private database: FirestoreService,
              private interaction: InteractionService,
              public firestorageservice: FirestorageService) {
               }

  ngOnInit() {}
  async crearNuevoMaterial(){
    this.interaction.presentLoading('Guardando')
     const path = 'Materiales';
     const name = this.data.nombre
     const res = await this.firestorageservice.uploadImage(this.newFile, path,name)
    this.data.foto= res;



     const id = this.database.getId();
     this.data.id = id;
     this.database.createDoc(this.data, path, id).then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Guardado Correctamente')
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
