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

  
ELEMENT_DATA: Herramientas[] = [

];



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


  editar(ev: any) {
    console.log('elemento -> ', ev);
    
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


  
 

}


/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  id: string
}
 */