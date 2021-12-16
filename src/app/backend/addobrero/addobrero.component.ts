import { FirestorageService } from './../../services/firestorage.service';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { InteractionService } from './../../services/interaction.service';
import { Obrero } from './../../models/models';

@Component({
  selector: 'app-addobrero',
  templateUrl: './addobrero.component.html',
  styleUrls: ['./addobrero.component.scss'],
})
export class AddobreroComponent implements OnInit {
  newImage = '';
  newFile = '';

  data: Obrero ={
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    foto: "",
    id : '',
}



  constructor (private database: FirestoreService,
              private interaction: InteractionService,
              public firestorageservice: FirestorageService ) { }

  ngOnInit() {}

 async crearNuevoObrero(){
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
