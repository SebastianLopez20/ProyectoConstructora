import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {}
  getObreros(){
    this.firestore.getCollection()
  }
  

}
