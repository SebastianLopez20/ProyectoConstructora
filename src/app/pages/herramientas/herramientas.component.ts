import { InteractionService } from './../../services/interaction.service';
import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { HerramientaI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.scss'],
})
export class HerramientasComponent implements OnInit {
 path = 'Herramientas';


ELEMENT_DATA: HerramientaI[] = [

];

newHerramienta : HerramientaI ={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    id: '',
}

  displayedColumns: string[] = ['foto', 'nombre', 'descripcion', 'cantidad', 'acciones'];

  dataSource: any

  constructor(private tabla: MatTableModule,
              private database: FirestoreService,
              private interaccion: InteractionService,

    ) {

      this. loadInfo()
     }

  ngOnInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editar(herramienta: HerramientaI) {
    console.log('elemento -> ', herramienta);
    this.newHerramienta = herramienta;
    this.database.updateDoc(this.newHerramienta, this.path, this.newHerramienta.id)

  }

  async loadInfo() {
    await this.interaccion.presentLoading("Cargando Datos");
      const path = 'Herramientas';
      this.database.getCollection<HerramientaI>(path).subscribe( res => {

        if (res) {
          this.ELEMENT_DATA = res;
          console.log('res -> ', this.ELEMENT_DATA);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.interaccion.closeLoading();
          }
      });
      this.interaccion.presentToast("Datos Cargados");
  }

  deletDoc(id: string){
    const path = 'Herramientas';
    console.log('newHerramienta id -', id);

    this.database.deleteDoc(path, id )
  }





}


/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  id: string
}
 */
