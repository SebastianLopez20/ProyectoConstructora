import { Obrero } from './../../models/models';
import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-obreros',
  templateUrl: './obreros.component.html',
  styleUrls: ['./obreros.component.scss'],
})
export class ObrerosComponent implements OnInit {

  path = 'Obreros';
  ELEMENT_DATA: Obrero[] = [

  ];
  newObrero : Obrero ={
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    foto: "",
    id: "",
};
displayedColumns: string[] = ['foto', 'nombre', 'apellido', 'cedula', 'acciones'];
dataSource: any

  constructor(private tabla: MatTableModule,
              private database: FirestoreService) {
                this. loadInfo();
              }

  ngOnInit() {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editar(obrero: Obrero) {
    console.log('elemento -> ', obrero);
    this.newObrero = obrero;
    this.database.updateDoc(this.newObrero, this.path, this.newObrero.id)

  }

  loadInfo() {
      const path = 'Obreros';
      this.database.getCollection<Obrero>(path).subscribe( res => {

        if (res) {
          this.ELEMENT_DATA = res;
          console.log('res -> ', this.ELEMENT_DATA);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          }
      });
  }

  deletDoc(id: string){
    const path = 'Obreros';
    console.log('newObrero id -', id);

    this.database.deleteDoc(path, id )
  }

}
