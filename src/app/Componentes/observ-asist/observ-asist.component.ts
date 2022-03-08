import { FirestoreService } from './../../services/firestore.service';
import { FirestorageService } from './../../services/firestorage.service';
import { InteractionService } from './../../services/interaction.service';
import { AsistenciaI } from './../../models/models';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

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
              private interaction: InteractionService,
              public alertController: AlertController) { }

  ngOnInit() {console.log('esto', this.team);
}

  Cerrar(){
    this.ModalController.dismiss();
    }


    async editar() {
      if(this.team.observaciones != ''){
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

        this.team.obs= true;

      this.database.updateDoc(this.team, this.path, this.team.id)
      this.interaction.presentToast("Datos Actualizados");
      this.Cerrar();
      }

      if(this.team.observaciones == ''){
        this.presentAlertConfirm();
      }
    }


    async borrarobs() {
      if(this.team.observaciones != ''){
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
      this.team.observaciones = '';
      this.team.justfoto = '';
      this.team.obs= false;
      this.database.updateDoc(this.team, this.path, this.team.id)
      this.interaction.presentToast("Datos Actualizados");
      this.Cerrar();
      }
    }


    async presentAlertConfirm() {
      const alert = await this.alertController.create({
        header: 'Ingrese los datos de observación.',
        cssClass: 'my-custom-class3',
        buttons: [
          {
            text: 'Aceptar',
            role: 'cancel',
            cssClass: 'secondary',
          }
        ]
      });

      await alert.present();
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
