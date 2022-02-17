import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AlertController, ModalController } from '@ionic/angular';
import { HerramientaI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-ver-herradmin',
  templateUrl: './ver-herradmin.component.html',
  styleUrls: ['./ver-herradmin.component.scss'],
})
export class VerHerradminComponent implements OnInit {
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

    displayedColumns: string[] = ['foto', 'nombre', 'descripcion', 'cantidad'];

    dataSource: any

  constructor(private tabla: MatTableModule,
    private database: FirestoreService,
    private interaccion: InteractionService,
    public modalController: ModalController,
    public alertController: AlertController) { }

  ngOnInit() { this. loadInfo()}
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

}
