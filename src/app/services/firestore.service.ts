import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  createDoc (data:any, path:string, id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

 

  getCollection<Obreros>(path: string){
    const collection= this.firestore.collection<Obreros>(path);
    return collection.valueChanges();
  }

  getId(){
    return this.firestore.createId();
  }
  deleteDoc (path: string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
  }


  updateDoc(data: any, path: string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }

  

  
}
