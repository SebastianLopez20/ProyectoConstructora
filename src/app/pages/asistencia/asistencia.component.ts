import { Router } from '@angular/router';
import { InteractionService } from './../../services/interaction.service';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from './../../services/firestore.service';
import { MatTableModule } from '@angular/material/table';
import { AsistenciaI, ObreroI } from './../../models/models';
import {MatTableDataSource} from '@angular/material/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
})
export class AsistenciaComponent implements OnInit {
  fechahoy: Date = new Date();
  fecha = "";
  path = 'Obreros';
  nombre: string;
  apellido: string;
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
  data : AsistenciaI={
    nombre: null,
    apellido: null,
    checked: null,
    fecha: null,
    id: ""
}
displayedColumns: string[] = ['foto', 'nombre', 'apellido', 'acciones'];
dataSource: any;

  constructor(private tabla: MatTableModule,
    private database: FirestoreService,
    public modalController: ModalController,
    private interaction: InteractionService,
    private router: Router,
  ) {this. loadInfo();
     this.fechaHoy(); }

  ngOnInit() {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  fechaHoy (){
    const fecha = this.database.formatDate(this.fechahoy)
    this.fecha = fecha;
  }

  async loadInfo() {
      await this.interaction.presentLoading("Cargando Obreros");
      const path = 'Obreros';
      this.database.getCollection<ObreroI>(path).subscribe( res => {

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
  async crearAsistencia(){
    await this.interaction.presentLoading('Marcando Asistencia')
     const path = 'Asistencia';
     const name = this.data.nombre;
     const id = this.fecha;
     this.data.fecha = this.fecha;
     this.data.id = id;
     this.data.checked = true;
     this.data.nombre= this.nombre;
     this.data.apellido = this.apellido;
     this.database.createDoc(this.data, path, id).then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Asistencia Marcada')
     })
  }

  async noAsistencia(){
    await this.interaction.presentLoading('Marcando Ausencia')
     const path = 'Asistencia';
     const name = this.data.nombre;
     const id = this.fecha;
     this.data.fecha = this.fecha;
     this.data.id = id;
     this.data.checked = false;
     this.data.nombre= this.nombre;
     this.data.apellido = this.apellido;
     this.database.createDoc(this.data, path, id).then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Ausencia Marcada')
     })
  }




}
