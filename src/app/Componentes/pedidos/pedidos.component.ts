import { Component, OnInit } from '@angular/core';
import { Obrero, Pedidos } from 'src/app/models/models';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  obreros: Obrero[] = [];
  newPedido: Pedidos = {
    obrero: null,
    pedido: null,
    estado: 'pedido',
    fecha: new Date(),
    tipo: '',
    id: null,
  }

  tipo = null

  constructor() {
    this.loadObreros()
   }

  ngOnInit() {}

  loadObreros() {
    const obrero: Obrero = {
      nombre: 'obrero 1',
      apellido: null,
      cedula: null,
      telefono: null,
      foto: null,
      id: '1',
    }
    const obrero1: Obrero = {
      nombre: 'obrero 2',
      apellido: null,
      cedula: null,
      telefono: null,
      foto: null,
      id: '2',
    }
    this.obreros.push(obrero);
    this.obreros.push(obrero1);
  }

  doPedido() {


  }

  selectObrero(ev: any) {
      console.log('ev -', this.obreros[ev.detail.value]);
      this.newPedido.obrero = this.obreros[ev.detail.value]
      
  }

  selectTipo(ev: any) {
    console.log('ev -', ev.detail.value);
    const tipo = ev.detail.value
    if (tipo === 'brown') {
      this.loadHerramientas()
    }
    
}

loadHerramientas() {
  console.log('load herramientas');
  
}



}
