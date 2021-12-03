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
  data: Herramientas ={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    id: '',
}

  constructor(private database: FirestoreService,
              private interaction: InteractionService) { }

  ngOnInit() {}
  crearNuevaHerramienta(){
    this.interaction.presentLoading('Guardando')
     const path = 'Herramientas';
     const id = this.database.getId();
     this.data.id = id;
     this.database.createDoc(this.data, path, id).then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Guardado Correctamente')
     })
  }

}
