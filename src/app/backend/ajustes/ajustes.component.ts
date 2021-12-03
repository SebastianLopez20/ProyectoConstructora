import { InteractionService } from './../../services/interaction.service';
import { Obrero } from './../../models/models';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent implements OnInit {

  data: Obrero ={
      nombre: "",
      apellido: "",
      cedula: "",
      telefono: "",
      id : '',
  }
  constructor(private database: FirestoreService,
              private interaction: InteractionService ) { }

  ngOnInit() {
    
    
  }
 crearNuevoObrero(){
    this.interaction.presentLoading('Guardando')
     const path = 'Obreros';
     const id = this.database.getId();
     this.data.id = id;
     this.database.createDoc(this.data, path, id).then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Guardado Correctamente')
     })
  }
}
