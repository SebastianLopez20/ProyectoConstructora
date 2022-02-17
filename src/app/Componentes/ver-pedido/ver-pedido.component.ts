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
    this.database.getCollection<PedidoI>(path).subscribe(res => {

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
  const iondate = new Date(event.detail.value);
  const fecha = this.database.formatDate(iondate);
  console.log('fechass',fecha);
  this.fechaFormato = fecha;
  console.log('fechaF',this.fechaFormato);

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
