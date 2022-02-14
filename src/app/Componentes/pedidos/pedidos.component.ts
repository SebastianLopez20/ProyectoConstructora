import { InteractionService } from './../../services/interaction.service';
import { FirestoreService } from './../../services/firestore.service';
import { Router,ActivatedRoute } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { ObreroI, PedidoI, HerramientaI, EquipoI } from 'src/app/models/models';
import { RouterLinkActive } from '@angular/router';
import { IonNavLink, RouterLinkDelegate } from '@ionic/angular';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  obreros: ObreroI[] = [];
  herramientas: HerramientaI[]= [];
  equipos: EquipoI []= [];
  Pedidos: PedidoI[]=[]
  ELEMENT_DATA: PedidoI[] = [

  ];
  displayedColumns: string[] = ['obrero', 'pedido', 'fecha', 'estado', 'acciones'];

  newPedido: PedidoI = {
    obrero: null,
    obreroAp: null,
    pedido: null,
    estado: 'pedido',
    fecha: new Date(),
    tipo: '',
    id: null,
  };
  dataSource: any;

  tipo = null;


  constructor(
               private database: FirestoreService,
              private interaction: InteractionService,
              private router: Router,

              ) {
                this.loadObreros();
                const hoy= new Date(); //dentro de los parentesis poner el formato de fecha obtenido de ionic
                const fechaInicial = hoy;
                fechaInicial.setHours(0);

   }

  ngOnInit() { }
 async loadObreros(){
    await this.interaction.presentLoading('Cargando Obreros');
    const path = 'Obreros';
      this.database.getCollection<ObreroI>(path).subscribe( res => {

      if(this.obreros.length == 0){
        this.interaction.closeLoading();
        this.interaction.presentToast('Datos Cargados');
      }
        if (res) {
          this.obreros = res;
          console.log('res -> ', this.obreros);
           this.obreros.push();
          }
      });

  }



  selectObrero(ev: any) {
      console.log('evselectob -', this.obreros[ev.detail.value]);
      this.newPedido.obrero = this.obreros[ev.detail.value].nombre;
      this.newPedido.obreroAp= this.obreros[ev.detail.value].apellido;
      console.log('obrero', this.newPedido.obrero);
  }

  selectTipo(ev: any) {
    console.log('ev -', ev.detail.value);
    const tipo = ev.detail.value;
    if (tipo === 'herramienta') {
      console.log('selec', tipo);
      this.tipo = tipo;
      this.loadHerramientas();
      this.newPedido.tipo = this.tipo;
    }
    if (tipo === 'equipo') {
      console.log('selec', tipo);
      this.tipo = tipo;
      this.loadEquipos();
      this.newPedido.tipo = this.tipo;
    }

}

loadHerramientas() {
  //this.interaction.presentLoading('Cargando Herramientas');
  const path = 'Herramientas';
  this.database.getCollection<HerramientaI>(path).subscribe( res => {

    if (res) {
      this.herramientas = res;
      console.log('res -> ', this.herramientas);
      //this.interaction.closeLoading();
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
loadEquipos(){
  //this.interaction.presentLoading('Cargando Equipos');
  const path = 'Equipos';
  this.database.getCollection<EquipoI>(path).subscribe( res => {

    if (res) {
      this.equipos = res;
      console.log('res -> ', this.equipos);
     // this.interaction.closeLoading();
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




async createPedido() {
  console.log('pedido', this.newPedido);
  await this.interaction.presentLoading('Creando Pedido')
     const path = 'Pedidos';
     const name = this.newPedido.obrero
     const id = this.database.getId();
     this.newPedido.id = id;
     this.database.createDoc(this.newPedido, path, id).then(() => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Pedido Creado')
        this.router.navigate(['verpedidos']);



     })





}




}
