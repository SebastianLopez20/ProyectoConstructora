import { ModalController } from '@ionic/angular';
import { DetailsMaterialComponent } from './../../Componentes/details-material/details-material.component';
import { InteractionService } from './../../services/interaction.service';
import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { MaterialI, EquipoI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss'],
})
export class MaterialesComponent implements OnInit {
   path = 'Materiales';

  ELEMENT_DATA: MaterialI[] = [

  ];

  newMaterial : MaterialI= {
    foto: '',
    nombre: '',
    descripcion: '',
    cantidad: null,
    id:'',
  }

  displayedColumns: string[] = ['foto', 'nombre', 'descripcion', 'cantidad', 'acciones'];
  dataSource: any
  constructor(private tabla: MatTableModule,
              private database: FirestoreService,
              private interaction: InteractionService,
              public modalController: ModalController,
              ) {
                this. loadInfo()
              }

  ngOnInit() {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editar(material: MaterialI) {
    console.log('elemento -> ', material);
    this.newMaterial = material;
    this.database.updateDoc(this.newMaterial, this.path, this.newMaterial.id)

  }

  async loadInfo() {
    await this.interaction.presentLoading("Cargando datos")
      const path = 'Materiales';
      this.database.getCollection<MaterialI>(path).subscribe( res => {

        if(this.ELEMENT_DATA.length == 0){
          this.interaction.closeLoading();
          this.interaction.presentToast('Datos Cargados');
        }

        if (res) {
          this.ELEMENT_DATA = res;
          console.log('res -> ', this.ELEMENT_DATA);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          }
      });
  }
  deletDoc(id: string){
    const path = 'Materiales';
    console.log('newMaterial id -', id);

    this.database.deleteDoc(path, id )
  }
  async verDetalles(material: MaterialI ){
  console.log('detalles', material);
  this.newMaterial = material;
 const modal = await this.modalController.create({
    component: DetailsMaterialComponent,
    componentProps: {team: this.newMaterial},
    mode: 'ios',
    swipeToClose: true,

  });
  return await modal.present();

  }

}
