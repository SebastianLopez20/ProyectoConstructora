import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AlertController, ModalController } from '@ionic/angular';
import { EquipoI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-ver-equipadmin',
  templateUrl: './ver-equipadmin.component.html',
  styleUrls: ['./ver-equipadmin.component.scss'],
})
export class VerEquipadminComponent implements OnInit {
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
  displayedColumns: string[] = ['foto', 'nombre', 'descripcion', 'cantidad'];
  dataSource: any
  constructor(private tabla: MatTableModule,
    private database: FirestoreService,
    private interaction: InteractionService,
    public modalController: ModalController,
    public alertController: AlertController) { }

  ngOnInit() {this.loadInfo();}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

      this.presentAlertConfirm1();

  }


  async presentAlertConfirm1() {
    const alert = await this.alertController.create({
      subHeader: 'Como usuario "Administrador" cuenta con el privilegio unico de lectura. Para interactuar con los archivos inicie sesión desde un perfil de "Bodeguero" o "Secretaria"',
      cssClass: 'my-custom-class1',
      buttons: [
        {
          text: 'Entendido',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });

    await alert.present();
  }

 /* async verDetalles(equipo: EquipoI){
  console.log('detalles', equipo);
  this.newEquipo = equipo;
 const modal = await this.modalController.create({
    component: DetailsEquipoComponent,
    componentProps: {team: this.newEquipo},
    mode: 'ios',
    swipeToClose: true,

  });
  return await modal.present();

  } */


}
