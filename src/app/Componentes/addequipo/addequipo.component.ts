import { Component, OnInit } from '@angular/core';
import { InteractionService } from './../../services/interaction.service';
import { Equipos } from './../../models/models';
import { FirestoreService } from './../../services/firestore.service';

@Component({
  selector: 'app-addequipo',
  templateUrl: './addequipo.component.html',
  styleUrls: ['./addequipo.component.scss'],
})
export class AddequipoComponent implements OnInit {
  data: Equipos ={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    fechacompra: '',
    id: '',
}

  constructor(private database: FirestoreService,
              private interaction: InteractionService) { }

  ngOnInit() {}
  crearNuevoEquipo(){
    this.interaction.presentLoading('Guardando')
     const path = 'Equipos';
     const id = this.database.getId();
     this.data.id = id;
     this.database.createDoc(this.data, path, id).then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Guardado Correctamente')
     })
  }

}
