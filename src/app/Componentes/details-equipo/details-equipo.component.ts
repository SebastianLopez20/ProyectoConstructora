import { FirestorageService } from './../../services/firestorage.service';
import { FirestoreService } from './../../services/firestore.service';
import { ModalController } from '@ionic/angular';
import { EquipoI } from 'src/app/models/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-equipo',
  templateUrl: './details-equipo.component.html',
  styleUrls: ['./details-equipo.component.scss'],
})
export class DetailsEquipoComponent implements OnInit {
  newImage = '';
  newFile = '';
  path = 'Equipos/';
  newEquipo : EquipoI={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    id: '',
  }
  boton: boolean = false;
  boton1: boolean = false;
  boton2: boolean = false;
  cont = 0;
  cont1 = 0;
  cont2 = 0;
  @Input() team: EquipoI;
  constructor(private ModalController: ModalController,
              private database: FirestoreService,
              public firestorageservice: FirestorageService) { }

  ngOnInit() {

    console.log('esto', this.team);

  }

  Cerrar(){
  this.ModalController.dismiss();
  }

  editarName(){
    this.cont = this.cont +1
    if(this.cont == 1){
      this.boton = true;
    }
    if(this.cont == 2){
      this.boton = false;
      this.cont = 0;
    }


  }
  editarCantidad(){
    this.cont1 = this.cont1 +1
    if(this.cont1 == 1){
      this.boton1 = true;
    }
    if(this.cont1 == 2){
      this.boton1 = false;
      this.cont1 = 0;
    }


  }
  editarDesc(){
    this.cont2 = this.cont2 +1
    if(this.cont2 == 1){
      this.boton2 = true;
    }
    if(this.cont2 == 2){
      this.boton2 = false;
      this.cont2 = 0;
    }


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
