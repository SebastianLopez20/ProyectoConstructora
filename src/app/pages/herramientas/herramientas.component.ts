import { DetailsHerramientaComponent } from './../../Componentes/details-herramienta/details-herramienta.component';
import { AlertController, ModalController } from '@ionic/angular';
import { InteractionService } from './../../services/interaction.service';
import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { HerramientaI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.scss'],
})
export class HerramientasComponent implements OnInit {
 path = 'Herramientas';


ELEMENT_DATA: HerramientaI[] = [

];

newHerramienta : HerramientaI ={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    id: '',
}

  displayedColumns: string[] = ['foto', 'nombre', 'descripcion', 'cantidad', 'acciones'];

  dataSource: any

  constructor(private tabla: MatTableModule,
              private database: FirestoreService,
              private interaccion: InteractionService,
              public modalController: ModalController,
              public alertController: AlertController

    ) {

      this. loadInfo()
     }

  ngOnInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editar(herramienta: HerramientaI) {
    console.log('elemento -> ', herramienta);
    this.newHerramienta = herramienta;
    this.database.updateDoc(this.newHerramienta, this.path, this.newHerramienta.id)

  }

  async loadInfo() {
    await this.interaccion.presentLoading("Cargando Datos");
      const path = 'Herramientas';
      this.database.getCollection<HerramientaI>(path).subscribe( res => {

        if(this.ELEMENT_DATA.length == 0){
          this.interaccion.closeLoading();
          this.interaccion.presentToast('Datos Cargados');
        }

        if (res) {
          this.ELEMENT_DATA = res;
          console.log('res -> ', this.ELEMENT_DATA);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          }
      });
  }

  deletDoc(id: string){
    const path = 'Herramientas';
    console.log('newHerramienta id -', id);
    this.database.deleteDoc(path, id )
    this.interaccion.presentToast("Herramienta Eliminada")
  }
  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: '¿Eliminar Archivo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Eliminar',
          handler: () => {
            this.deletDoc(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async verDetalles(herramienta: HerramientaI){
    console.log('detalles', herramienta);
    this.newHerramienta = herramienta;
   const modal = await this.modalController.create({
      component: DetailsHerramientaComponent,
      componentProps: {team: this.newHerramienta},
      mode: 'ios',
      swipeToClose: true,

    });
    return await modal.present();

    }




}

