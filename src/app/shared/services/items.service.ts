import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any>;
  itemDoc: AngularFirestoreDocument<Item>;

  public itemSelected = new BehaviorSubject<Item>(null);

  constructor(private fs: AngularFirestore) {
    this.itemsCollection = this.fs.collection('items', ref => ref.orderBy('name'));
    this.items = this.itemsCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          return { id, ...data }
        }))
      );
  }

  public getItems(): any {
    return this.items;
  }

  public addItem(payload: Item): void {
    this.itemsCollection.add(payload);
  }

  public updateItem(item: Item): void {
    this.itemDoc = this.fs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }

  public deleteItem(item: Item): void {
    this.itemDoc = this.fs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

}