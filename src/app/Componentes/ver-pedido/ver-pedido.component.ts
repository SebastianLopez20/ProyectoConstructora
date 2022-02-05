import { InteractionService } from './../../services/interaction.service';
import { PedidoI } from './../../models/models';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-ver-pedido',
  templateUrl: './ver-pedido.component.html',
  styleUrls: ['./ver-pedido.component.scss'],
})
export class VerPedidoComponent implements OnInit {
  ELEMENT_DATA: PedidoI[] = [
  ];
  displayedColumns: string[] = ['obrero', 'pedido', 'fecha', 'estado', 'acciones'];
  dataSource: any;

  constructor(private tabla: MatTableModule,
              private database: FirestoreService,
              private interaccion: InteractionService,
    ) {
      this.getPedidos();
      const hoy= new Date(); //dentro de los parentesis poner el formato de fecha obtenido de ionic
      const fechaInicial = hoy;
      fechaInicial.setHours(0);



    }

  ngOnInit() {}
  async getPedidos(){
    await this.interaccion.presentLoading("Cargando Datos");
    const path = "Pedidos/";
    this.database.getCollection<PedidoI>(path).subscribe(res => {

      if(res){
        this.ELEMENT_DATA = res;
        console.log('res -> ', this.ELEMENT_DATA);
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.interaccion.closeLoading();
      }

      this.interaccion.presentToast("Datos Cargados");

    })

  }
  deletDoc(id: string){
    const path = 'Pedidos';
    console.log('newPedido id -', id);
    this.database.deleteDoc(path, id )
  }

}
