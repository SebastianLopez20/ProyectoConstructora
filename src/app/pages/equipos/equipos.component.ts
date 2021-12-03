import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { Equipos } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent implements OnInit {
  
  ELEMENT_DATA: Equipos[] = [

  ];

   
  displayedColumns: string[] = ['foto', 'nombre', 'descripcion', 'cantidad', 'fechacompra', 'acciones'];
  dataSource: any
  constructor(private tabla: MatTableModule,
             private database: FirestoreService) { 
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
      const path = 'Equipos';
      this.database.getCollection<Equipos>(path).subscribe( res => {
        
        if (res) {
          this.ELEMENT_DATA = res;
          console.log('res -> ', this.ELEMENT_DATA);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          }
      });
  }

}
