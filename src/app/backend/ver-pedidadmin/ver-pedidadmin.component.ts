import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AlertController, ModalController } from '@ionic/angular';
import { PedidoI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-ver-pedidadmin',
  templateUrl: './ver-pedidadmin.component.html',
  styleUrls: ['./ver-pedidadmin.component.scss'],
})
export class VerPedidadminComponent implements OnInit {
  fechaselected = new Date();
  fechaelegida: string = (new Date()).toISOString();
  thisPedido : PedidoI = {
    obrero: null,
    obreroAp: null,
    pedido: null,
    estado: 'pedido',
    fecha: null,
    id: '',
    tipo: null

  }
  fechaFormato: String;
  ELEMENT_DATA: PedidoI[] = [
  ];
  displayedColumns: string[] = ['obrero', 'pedido', 'fecha', 'estado'];
  dataSource: any;

  constructor(private tabla: MatTableModule,
    private database: FirestoreService,
    private interaccion: InteractionService,
    public alertController: AlertController,
    public modalController: ModalController,
) { }

  ngOnInit() {this.getPedidos()}
  async getPedidos(){
    await this.interaccion.presentLoading("Cargando Datos");
    const path = "Pedidos/";
      let fechainicial= new Date(this.fechaselected);
    fechainicial.setHours(0)
    fechainicial.setMinutes(0)
    fechainicial.setSeconds(0)
    let fechafinal= new Date(this.fechaselected);
    fechafinal.setHours(23)
    fechafinal.setMinutes(59)
    fechafinal.setSeconds(59)
    console.log('fechainicial',fechainicial);
    console.log('fechafinal',fechafinal);
    this.database.getCollection2QueryOrderLimit<PedidoI>(path,'fecha','>=',fechainicial,'fecha','<=',fechafinal,100,'fecha','desc',null).subscribe(res => {
      console.log('res',res);

      if(this.ELEMENT_DATA.length == 0){
        this.interaccion.closeLoading();
        this.interaccion.presentToast('Datos Cargados');
      }

      if(res){
        this.ELEMENT_DATA = res;
        console.log('res -> ', this.ELEMENT_DATA);
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      }

    })

    this.presentAlertConfirm1()

  }

  fechaElegida(event){
  console.log(event);
  this.fechaselected = new Date(event.detail.value);
  const iondate = new Date(event.detail.value);
  const fecha = this.database.formatDate(iondate);
  console.log('fechass',fecha);
  this.fechaFormato = fecha;
  console.log('fechaF',this.fechaFormato);
  this.ELEMENT_DATA = [];
  this.getPedidos();
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
