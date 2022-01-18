import { InteractionService } from './../../services/interaction.service';
import { FirestoreService } from './../../services/firestore.service';

import { Component, OnInit } from '@angular/core';
import { Obrero, Pedidos, Herramientas, Equipos, Materiales } from 'src/app/models/models';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  obreros: Obrero[] = [];
  herramientas: Herramientas[]= [];
  materiales: Materiales[] = [];
  equipos: Equipos []= [];

  newPedido: Pedidos = {
    obrero: null,
    pedido: null,
    estado: 'pedido',
    fecha: new Date(),
    tipo: '',
    id: null,
  };
  dataSource: any;

  tipo = null;

  constructor( private database: FirestoreService,
              private interaction: InteractionService,) {
                this.loadObreros();
   }

  ngOnInit() {}

  loadObreros() {
   // this.interaction.presentLoading('Cargando Obreros');
   // this.interaction.closeLoading();
    const path = 'Obreros';
      this.database.getCollection<Obrero>(path).subscribe( res => {

        if (res) {
          this.obreros = res;
          console.log('res -> ', this.obreros);

           this.obreros.push();
          }
      });
     // this.interaction.presentToast('Datos Cargados');
  }



  selectObrero(ev: any) {
      console.log('evselectob -', this.obreros[ev.detail.value]);
      this.newPedido.obrero = this.obreros[ev.detail.value].nombre;
      console.log('obrero', this.newPedido.obrero);
  }

  selectTipo(ev: any) {
    console.log('ev -', ev.detail.value);
    const tipo = ev.detail.value;
    if (tipo === 'herramienta') {
      console.log('selec', tipo);
      this.tipo = tipo;
      this.loadHerramientas();
    }
    if (tipo === 'material') {
      console.log('selec', tipo);
      this.tipo = tipo;
      this.loadMateriales();
    }
    if (tipo === 'equipo') {
      console.log('selec', tipo);
      this.tipo = tipo;
      this.loadEquipos();
    }

}

loadHerramientas() {
  this.interaction.presentLoading('Cargando Herramientas');
  const path = 'Herramientas';
  this.database.getCollection<Herramientas>(path).subscribe( res => {

    if (res) {
      this.herramientas = res;
      console.log('res -> ', this.herramientas);
      this.interaction.closeLoading();
       //this.obreros.push();
      }
  });
  this.interaction.presentToast('Datos Cargados');
}

 selectHerramienta(ev: any) {
      console.log('evselectherr -', this.herramientas[ev.detail.value]);
      this.newPedido.pedido = this.herramientas[ev.detail.value].nombre;
      console.log('pedido', this.newPedido.pedido);
  }

loadMateriales() {
  this.interaction.presentLoading('Cargando Materiales');
  const path = 'Materiales';
  this.database.getCollection<Materiales>(path).subscribe( res => {

    if (res) {
      this.materiales = res;
      console.log('res -> ', this.materiales);
      this.interaction.closeLoading();
       //this.obreros.push();
      }
  });
  this.interaction.closeLoading();
  this.interaction.presentToast('Datos Cargados');
}
selectMaterial(ev: any) {
  console.log('evselectmat -', this.materiales[ev.detail.value]);
  this.newPedido.pedido = this.materiales[ev.detail.value].nombre;
  console.log('pedido', this.newPedido.pedido);
}


loadEquipos(){
  this.interaction.presentLoading('Cargando Equipos');
  const path = 'Equipos';
  this.database.getCollection<Equipos>(path).subscribe( res => {

    if (res) {
      this.equipos = res;
      console.log('res -> ', this.equipos);
      this.interaction.closeLoading();
       //this.obreros.push();
      }
  });
  this.interaction.presentToast('Datos Cargados');
};
selectEquipo(ev: any) {
  console.log('evselectequip -', this.equipos[ev.detail.value]);
  this.newPedido.pedido = this.equipos[ev.detail.value].nombre;
  console.log('pedido', this.newPedido.pedido);
}




doPedido() {


}


}
