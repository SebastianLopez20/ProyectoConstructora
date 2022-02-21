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
  fecha = this.database.formatDate(this.fechahoy);
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
  data : AsistenciaI= {
    nombre: null,
    apellido: null,
    checked: false,
    fecha: "",
    id: "",

}

obreros: ObreroI[]=[]
asistenciahoy: AsistenciaI[]=[]

displayedColumns: string[] = ['foto', 'nombre', 'apellido','checked', 'acciones'];
dataSource: any;

  constructor(private tabla: MatTableModule,
    private database: FirestoreService,
    public modalController: ModalController,
    private interaction: InteractionService,
    private router: Router,
  ) {this. loadInfo();
     this.fechaHoy(); }

  ngOnInit() {
   }

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
          this.obreros=res;
          console.log('res -> ', this.ELEMENT_DATA);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.loadAsistencia();
          }
      });
  }

  async loadAsistencia() {

    const path = 'Asistencia/' +this.fecha+ '/obreros';
    this.database.getSubCollection<AsistenciaI>(path).subscribe( res => {
      if (res) {
        this.asistenciahoy = res;
        console.log('res -> ', this.asistenciahoy);
        this.mathAsistencia();
        }
    });
}


  mathAsistencia() {
        this.asistenciahoy.forEach( obreroLista => {
             const busqueda = this.obreros.find( obrero => { return obrero.id === obreroLista.id});
             if (busqueda) {
              busqueda.checked =  obreroLista.checked;
             }
        })
  }

  async crearAsistencia(obrero: ObreroI){
    this.newObrero = obrero;
    await this.interaction.presentLoading('Marcando Asistencia')
     const path = "Asistencia/" + this.fecha + "/obreros";
     this.data.apellido = obrero.apellido;
     this.data.fecha = this.fecha;
     this.data.id = this.newObrero.id;
     this.data.checked = true;
     this.data.nombre= this.newObrero.nombre;
     this.database.createDoc(this.data, path, this.data.id).then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Asistencia Marcada')
     })
  }

  async crearAusente(obrero: ObreroI){
    this.newObrero = obrero;
    await this.interaction.presentLoading('Marcando Asistencia')
     const path = "Asistencia/" + this.fecha + "/obreros";
     this.data.apellido = this.newObrero.apellido;
     this.data.fecha = this.fecha;
     this.data.id = this.newObrero.id;
     this.data.checked = false;
     this.data.nombre= this.newObrero.nombre;
     this.database.createDoc(this.data, path, this.data.id).then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Asistencia Marcada')
     })


  }





}
