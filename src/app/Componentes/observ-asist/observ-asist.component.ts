import { FirestoreService } from './../../services/firestore.service';
import { FirestorageService } from './../../services/firestorage.service';
import { InteractionService } from './../../services/interaction.service';
import { AsistenciaI } from './../../models/models';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-observ-asist',
  templateUrl: './observ-asist.component.html',
  styleUrls: ['./observ-asist.component.scss'],
})
export class ObservAsistComponent implements OnInit {
  fech: "";
  observ: "";
  newImage = '';
  fechahoy: Date = new Date();
  fecha = this.database.formatDate(this.fechahoy);
  newFile = '';
  path = '';
  newAsistencia: AsistenciaI ={
    nombre: '',
    apellido:'',
    checked: null,
    fecha: '',
    id:'',
    observaciones:'',
    justfoto:''

  }

  @Input() team: AsistenciaI;
  constructor(private ModalController: ModalController,
              private database: FirestoreService,
              public firestorageservice: FirestorageService,
              private interaction: InteractionService) { }

  ngOnInit() {console.log('esto', this.team);
}

  Cerrar(){
    this.ModalController.dismiss();
    }
    async editar() {
      console.log('feha',this.team.fecha);
      this.path = 'Asistencia/' +this.team.fecha + '/obreros';
      const path = 'Asistencia/' +this.team.fecha+ '/obreros';
      const name = this.team.nombre;
      if(this.newImage){
        const res = await this.firestorageservice.uploadImage(this.newFile, path,name)
        this.team.justfoto= res;
      }
      console.log('elemento -> ', this.team);
      console.log('path',this.path)
      this.database.updateDoc(this.team, this.path, this.team.id)
      this.interaction.presentToast("Datos Actualizados");
      this.Cerrar();

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
