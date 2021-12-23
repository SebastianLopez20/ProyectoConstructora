import { FirestorageService } from './../../services/firestorage.service';
import { Component, OnInit } from '@angular/core';
import { InteractionService } from './../../services/interaction.service';
import { Herramientas } from './../../models/models';
import { FirestoreService } from './../../services/firestore.service';

@Component({
  selector: 'app-addherramienta',
  templateUrl: './addherramienta.component.html',
  styleUrls: ['./addherramienta.component.scss'],
})
export class AddherramientaComponent implements OnInit {
  newImage = '';
  newFile = '';
  data: Herramientas ={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    id: '',
}

  constructor(private database: FirestoreService,
              private interaction: InteractionService,
              public firestorageservice: FirestorageService) { }

  ngOnInit() {}
  async crearNuevaHerramienta(){
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
