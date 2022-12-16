import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Dancer from '../../models/dancer';

@Injectable({
  providedIn: 'root'
})
export class DancerService {
  private dbPath = '/dancers';

  apiRef: AngularFireList<Dancer>;

  constructor(db: AngularFireDatabase) {
    this.apiRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Dancer> {
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