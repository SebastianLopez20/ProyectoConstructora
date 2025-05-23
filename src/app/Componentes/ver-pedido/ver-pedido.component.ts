import { DetailsEquipoComponent } from './../details-equipo/details-equipo.component';
import { InteractionService } from './../../services/interaction.service';
import { PedidoI, ObreroI } from './../../models/models';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ver-pedido',
  templateUrl: './ver-pedido.component.html',
  styleUrls: ['./ver-pedido.component.scss'],
})
export class VerPedidoComponent implements OnInit {
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
  displayedColumns: string[] = ['obrero', 'pedido', 'fecha', 'estado', 'acciones'];
  dataSource: any;
  constructor(private tabla: MatTableModule,
              private database: FirestoreService,
              private interaccion: InteractionService,
              public alertController: AlertController,
              public modalController: ModalController,
    ) {
      this.getPedidos();

    }

  ngOnInit() {}
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

  }
  deletDoc(id: string){
    const path = 'Pedidos';
    console.log('newPedido id -', id);
    this.database.deleteDoc(path, id )
    this.interaccion.presentToast("Pedido Eliminado")
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


  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: '¿Eliminar Pedido?',
      cssClass: 'my-custom-class',
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

  cambiarEstado(pedido: PedidoI){
    const path = 'Pedidos';
    const name = pedido.pedido
    this.thisPedido = pedido;
    console.log('detalles', pedido);
    pedido.estado= 'devuelto';
    this.database.updateDoc(pedido, path, pedido.id)
    this.interaccion.presentToast("Pedido Marcado como devuelto")
  }

  async presentAlertConfirm2(pedido: PedidoI) {
    const alert = await this.alertController.create({
      header: '¿Marcar como devuelto?',
      cssClass: 'my-custom-class2',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Aceptar',
          cssClass: 'primary',
          handler: () => {
            this.cambiarEstado(pedido);
          }
        }
      ]
    });

    await alert.present();
  }

}
