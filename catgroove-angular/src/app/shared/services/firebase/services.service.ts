import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import Service from '../../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private dbPath = '/service';

  apiRef: AngularFireList<Service>;

  constructor(db: AngularFireDatabase) {
    this.apiRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Service> {
    return this.apiRef;
  }

  create(any: any): any {
    return this.apiRef.push(any);
  }

  update(key: string, value: any): Promise<void> {
    return this.apiRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.apiRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.apiRef.remove();
  }
}
