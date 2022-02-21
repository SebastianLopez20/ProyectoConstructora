import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
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
  getSubCollection<tipo>(path: string){
    const collection= this.firestore.collection<tipo>(path);
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

  formatDate(date: Date): string{
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year+"-"+month+"-"+ day;
  }

  getCollection2QueryOrderLimit<tipo>(path: string,
                      parametro1: string, condicion1: any, busqueda1: any,
                      parametro2: string, condicion2: any, busqueda2: any,
                      LIMIT: number, orderId: string, directionSort: 'asc' | 'desc',
                      STARTAT?: any): Observable<tipo[]> {
    if (STARTAT === null) {
    const itemsCollection: AngularFirestoreCollection<tipo> =
    this.firestore.collection<tipo>(path
        , ref => ref.where(parametro1, condicion1, busqueda1)
                    .where(parametro2, condicion2, busqueda2)
                    .orderBy(orderId, directionSort)
                    .limit(LIMIT));
        return itemsCollection.valueChanges();
    } else {
    const itemsCollection: AngularFirestoreCollection<tipo> =
    this.firestore.collection<tipo>(path
          , ref => ref.where(parametro1, condicion1, busqueda1)
                      .where(parametro2, condicion2, busqueda2)
                      .orderBy(orderId, directionSort)
                      .startAfter(STARTAT)
                      .limit(LIMIT));
          return itemsCollection.valueChanges();
    }
  }





}
