import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AsistenciaI } from 'src/app/models/models';
import { ObservAsistComponent } from 'src/app/Componentes/observ-asist/observ-asist.component';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.component.html',
  styleUrls: ['./ver-asistencia.component.scss'],
})
export class VerAsistenciaComponent implements OnInit {
  fechahoy: Date = new Date();
  fecha = this.database.formatDate(this.fechahoy);
  fechaselected: Date= new Date();
  ELEMENT_DATA: AsistenciaI[] = [
  ];

  newAsistencia: AsistenciaI ={
    nombre: '',
    apellido:'',
    checked: 'Ausente',
    fecha: '',
    id:''

  }
  displayedColumns: string[] = ['nombre', 'apellido', 'fecha', 'asistencia', 'Observaciones'];
  dataSource: any;
  constructor(private tabla: MatTableModule,
              private database: FirestoreService,
              private interaccion: InteractionService,
              public modalController: ModalController,
              public alertController: AlertController) { this.loadInfo();}

  ngOnInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  async loadInfo() {
    await this.interaccion.presentLoading("Cargando Datos");
      const path = 'Asistencia/' + this.fecha + '/obreros';
    let fechainicial= new Date(this.fechaselected);
    fechainicial.setHours(0)
    fechainicial.setMinutes(0)
    fechainicial.setSeconds(0)
    const fechainicialsi = this.database.formatDate(fechainicial)
    let fechafinal= new Date(this.fechaselected);
    fechafinal.setHours(23)
    fechafinal.setMinutes(59)
    fechafinal.setSeconds(59)
    const fechafinalsi = this.database.formatDate(fechafinal)
    console.log('fechainicial',fechainicialsi);
    console.log('fechafinal',fechafinalsi);
    this.database.getCollection2QueryOrderLimit<AsistenciaI>(path,'fecha','>=',fechainicialsi,'fecha','<=',fechafinalsi,100,'fecha','desc',null).subscribe( res => {

        if(this.ELEMENT_DATA.length == 0){
          this.interaccion.closeLoading();
          this.interaccion.presentToast('Datos Cargados');
        }

        if (res) {
          this.ELEMENT_DATA = res;
          console.log('res -> ', this.ELEMENT_DATA);
          console.log('eoo',this.fecha);

          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          }
      });
  }



  fechaElegida(event){
    console.log(event);
    this.fechaselected = new Date(event.detail.value);
    this.fecha = this.database.formatDate(this.fechaselected)
    /* const iondate = new Date(event.detail.value);
    const fecha = this.database.formatDate(iondate);
    console.log('fechass',fecha);
    this.fechaFormato = fecha;
    console.log('fechaF',this.fechaFormato); */
    this.ELEMENT_DATA = [];
    this.loadInfo();
    }

    async verDetalles(asistencia: AsistenciaI){
    console.log('detalles', asistencia);
    this.newAsistencia = asistencia;
   const modal = await this.modalController.create({
      component: ObservAsistComponent,
      componentProps: {team: this.newAsistencia},
      mode: 'ios',
      swipeToClose: true,

    });
    return await modal.present();

    }



}
