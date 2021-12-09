import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { Herramientas } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.scss'],
})
export class HerramientasComponent implements OnInit {
 path = 'Herramientas';

  
ELEMENT_DATA: Herramientas[] = [

];

newHerramienta : Herramientas ={
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    id: '',
}

  displayedColumns: string[] = ['foto', 'nombre', 'descripcion', 'cantidad', 'acciones'];
  
  dataSource: any
   
  constructor(private tabla: MatTableModule,
              private database: FirestoreService

    ) {

      this. loadInfo()
     }

  ngOnInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editar(herramienta: Herramientas) {
    console.log('elemento -> ', herramienta);
    this.newHerramienta = herramienta;
    this.database.updateDoc(this.newHerramienta, this.path, this.newHerramienta.id)
    
  }

  loadInfo() {
      const path = 'Herramientas';
      this.database.getCollection<Herramientas>(path).subscribe( res => {
        
        if (res) {
          this.ELEMENT_DATA = res;
          console.log('res -> ', this.ELEMENT_DATA);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          }
      });
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