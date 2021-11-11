import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  creatDoc(){
    this.firestore.collection('Obreros')
  }

  getCollection(){
    console.log("leer la coleccion")
    this.firestore.collection('Obreros').valueChanges().subscribe((res) => {

    });
  }
}
