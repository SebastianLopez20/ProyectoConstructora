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
  data: Materiales ={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    unidadmedida: '',
    id: '',
}


  constructor(private database: FirestoreService,
              private interaction: InteractionService) {
               }

  ngOnInit() {}
  crearNuevoMaterial(){
    this.interaction.presentLoading('Guardando')
     const path = 'Materiales';
     const id = this.database.getId();
     this.data.id = id;
     this.database.createDoc(this.data, path, id).then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Guardado Correctamente')
     })
  }

}
