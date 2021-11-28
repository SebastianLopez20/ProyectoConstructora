import { Obrero } from './../../models/models';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent implements OnInit {
  constructor(private database: FirestoreService) { }
  ngOnInit() {
    console.log('esto es ajustes ');
    
  }
 crearNuevoObrero(){
     const albanil : Obrero = {
       obrero1: {
         Nombre: "Esteban",
         Apellido: "Cajas",
         Cedula: "1725321580",
         Telefono: "0959833164"
 },
       obrero2: {
         Nombre: "Sandro",
        Apellido: "Carchi",
         Cedula: "1755321540",
         Telefono: "0959833164"
 }
    }
     const path = 'Obreros';
     this.database.createDoc(albanil, path, 'idobreros' )
  }
}
