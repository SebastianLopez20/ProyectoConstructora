import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { Materiales } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss'],
})
export class MaterialesComponent implements OnInit {

  ELEMENT_DATA: Materiales[] = [

  ];

  
  displayedColumns: string[] = ['foto', 'nombre', 'descripcion', 'cantidad', 'unidadmedida', 'acciones'];
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
      const path = 'Materiales';
      this.database.getCollection<Materiales>(path).subscribe( res => {
        
        if (res) {
          this.ELEMENT_DATA = res;
          console.log('res -> ', this.ELEMENT_DATA);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          }
      });
  }

}
