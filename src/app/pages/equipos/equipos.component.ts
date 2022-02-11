import { DetailsEquipoComponent } from './../../Componentes/details-equipo/details-equipo.component';
import { InteractionService } from './../../services/interaction.service';
import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { EquipoI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent implements OnInit {
  path = 'Equipos';
  ELEMENT_DATA: EquipoI[] = [

  ];
  newEquipo : EquipoI={
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
             private interaction: InteractionService,
             public modalController: ModalController,
             public alertController: AlertController) {
              this. loadInfo()
             }

  ngOnInit() {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editar(equipo: EquipoI) {
    console.log('elemento -> ', equipo);
    this.newEquipo = equipo;
    this.database.updateDoc(this.newEquipo, this.path, this.newEquipo.id)

  }

  async loadInfo() {
    await this.interaction.presentLoading("Cargando Datos");
      const path = 'Equipos';
      this.database.getCollection<EquipoI>(path).subscribe( res => {

        if(this.ELEMENT_DATA.length == 0){
          this.interaction.closeLoading();
          this.interaction.presentToast('Datos Cargados');
        }

        if (res) {
          this.ELEMENT_DATA = res;
          console.log('res -> ', this.ELEMENT_DATA);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          }
      });

  }
  deletDoc(id: string){
    const path = 'Equipos';
    console.log('newEquipo id -', id);
    this.database.deleteDoc(path, id )
    this.interaction.presentToast("Equipo Eliminado");
  }

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: '¿Eliminar Archivo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Eliminar',
          cssClass: 'primary',
          handler: () => {
            this.deletDoc(id);
          }
        }
      ]
    });

    await alert.present();
  }

 async verDetalles(equipo: EquipoI){
  console.log('detalles', equipo);
  this.newEquipo = equipo;
 const modal = await this.modalController.create({
    component: DetailsEquipoComponent,
    componentProps: {team: this.newEquipo},
    mode: 'ios',
    swipeToClose: true,

  });
  return await modal.present();

  }


}
