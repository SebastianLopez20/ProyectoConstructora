import { AuthService } from './../../services/auth.service';
import { InteractionService } from './../../services/interaction.service';
import { ModalController } from '@ionic/angular';
import { DetailsObreroComponent } from './../details-obrero/details-obrero.component';
import { ObreroI } from './../../models/models';
import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obreros',
  templateUrl: './obreros.component.html',
  styleUrls: ['./obreros.component.scss'],
})
export class ObrerosComponent implements OnInit {

  path = 'Obreros';
  ELEMENT_DATA: ObreroI[] = [

  ];
  newObrero : ObreroI={
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    foto: "",
    id: "",
};
displayedColumns: string[] = ['foto', 'nombre', 'apellido', 'cedula', 'acciones'];
dataSource: any

  constructor(private tabla: MatTableModule,
              private database: FirestoreService,
              public modalController: ModalController,
              private auth: AuthService,
              private interaction: InteractionService,
              private router: Router) {
                this. loadInfo();
              }

  ngOnInit() {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editar(obrero: ObreroI) {
    console.log('elemento -> ', obrero);
    this.newObrero = obrero;
    this.database.updateDoc(this.newObrero, this.path, this.newObrero.id)

  }

  loadInfo() {
      const path = 'Obreros';
      this.database.getCollection<ObreroI>(path).subscribe( res => {

        if (res) {
          this.ELEMENT_DATA = res;
          console.log('res -> ', this.ELEMENT_DATA);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          }
      });
  }

  deletDoc(id: string){
    const path = 'Obreros';
    console.log('newObrero id -', id);

    this.database.deleteDoc(path, id )
  }

  async verDetalles(obrero: ObreroI){
    console.log('detalles', obrero);
    this.newObrero = obrero;
   const modal = await this.modalController.create({
      component: DetailsObreroComponent,
      componentProps: {team: this.newObrero},
      mode: 'ios',
      swipeToClose: true,

    });
    return await modal.present();

    }
    async logout(){
      await this.auth.logout();
        this.interaction.presentToast('Sesion Cerrada')
        this.router.navigate(['login']);

      }

}
